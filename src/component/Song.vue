<template>
    <div v-if="song">
        <div>Missed Notes: {{ errors }}</div>
        <pc-score :song="song" :measure-index="measureIndex" :staff-entry-index="staffEntryIndex" @loaded="onLoadOsmd($event)"></pc-score>
        <pc-midi-input :song="song" :osmd="osmd" :measure-index="measureIndex" :staff-entry-index="staffEntryIndex" @notePlayed="onNotePlayed()" @noteError="errors++"></pc-midi-input>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import MidiInput from './MidiInput.vue';
import Score from './Score.vue';
import SongEntity from '../js/Song';
import { OSMD } from 'opensheetmusicdisplay';

@Component({
    components: {
        'pc-midi-input': MidiInput,
        'pc-score': Score,
    },
    props: {
        song: {
            type: SongEntity,
            required: false,
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
    staffEntryIndex: number = 0;
    errors: number = 0;
    osmd: OSMD|null = null;
    song: SongEntity|null = null;

    finishSong() {
        this.resetSong();
    }

    resetSong() {
        this.measureIndex = 0;
        this.staffEntryIndex = 0;
        this.errors = 0;
    }

    onNotePlayed() {
        do {
            if (this.staffEntryIndex < this.osmd.graphic.measureList[this.measureIndex][0].staffEntries.length - 1) {
                this.staffEntryIndex++;
            } else if (this.measureIndex < this.osmd.graphic.measureList.length - 1) {
                this.staffEntryIndex = 0;
                this.measureIndex++;
            } else {
                this.finishSong();
            }
        } while (this.osmd.graphic.measureList[this.measureIndex][0].staffEntries[this.staffEntryIndex].vfNotes[1].noteType === 'r'); // 'r' is a pause
    }

    onLoadOsmd(osmd) {
        this.osmd = osmd;
    }

}
</script>
