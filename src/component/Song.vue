<template>
    <div>
        <div style="text-align: center">
            <v-progress-circular :value="measureIndex / wrapper.getNumberOfMeasures() * 100" v-if="wrapper">{{ errors }}</v-progress-circular>
        </div>
        <pc-score :song="song" :measure-index="measureIndex" :staff-entry-index="staffEntryIndex"></pc-score>
        <pc-midi-input :song="song" :wrapper="wrapper" :measure-index="measureIndex" :staff-entry-index="staffEntryIndex" @notePlayed="onNotePlayed()" @noteError="errors++"></pc-midi-input>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import MidiInput from './MidiInput.vue';
import Score from './Score.vue';
import SongEntity from '../js/Song';
import SongWrapper from "../js/SongWrapper";
import Highscore from "../js/Highscore";

@Component({
    components: {
        'pc-midi-input': MidiInput,
        'pc-score': Score,
    },
    props: {
        song: {
            type: SongEntity,
            required: true,
        }
    },
    watch: {
        song() {
            this.resetSong();
        }
    }
})
export default class Song extends Vue {

    measureIndex: number = 0;
    startedAt: number = null;
    staffEntryIndex: number = 0;
    errors: number = 0;
    wrapper: SongWrapper|null = null;
    song: SongEntity|null;

    finishSong() {
        this.song.addHighscore(new Highscore(this.errors, Date.now() - this.startedAt));
        this.resetSong();
    }

    resetSong() {
        this.measureIndex = 0;
        this.staffEntryIndex = 0;
        this.errors = 0;
        this.startedAt = null;
    }

    onNotePlayed() {
        if (this.startedAt === null) {
            this.startedAt = Date.now();
        }
        do {
            if (this.staffEntryIndex < this.wrapper.getNumberOfStaffEntriesInMeasure(this.measureIndex) - 1) {
                this.staffEntryIndex++;
            } else if (this.measureIndex < this.wrapper.getNumberOfMeasures() - 1) {
                this.staffEntryIndex = 0;
                this.measureIndex++;
            } else {
                this.finishSong();
            }
        } while (this.wrapper.isSkipped(this.measureIndex, this.staffEntryIndex));
    }

    public created(): void {
        window.bus.$on('song_loaded', (wrapper) => this.wrapper = wrapper);
    }

}
</script>
