<template>
    <div>
        <div style="text-align: center">
            <v-progress-circular :size="50" :value="wrapper.progress()" v-if="wrapper">{{ wrapper.getErrors() }}</v-progress-circular>
        </div>
        <pc-score :song="song"></pc-score>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Score from './Score.vue';
import SongEntity from '../js/SongData';
import Song from "../js/Song";
import Highscore from "../js/Highscore";
import {EventBus} from "../js/EventBus";

@Component({
    components: {
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

    startedAt: number = null;
    wrapper: Song|null = null;
    song: SongEntity|null;

    finishSong() {
        this.song.addHighscore(new Highscore(this.wrapper.getErrors(), Date.now() - this.startedAt));
        this.resetSong();
    }

    resetSong() {
        this.startedAt = null;
        this.wrapper.reset();
    }

    public created(): void {
        EventBus.$on('song_loaded', (wrapper) => this.wrapper = wrapper);
        EventBus.$on('key_pressed', (note) => {
            if (note === this.wrapper.getCurrentSongElement().getHalfTone()) {
                EventBus.$emit('note_played');
            } else {
                EventBus.$emit('note_error');
            }
        });
        EventBus.$on('note_played', () => {
            if (this.startedAt === null) {
                this.startedAt = Date.now();
            }
            do {
                this.wrapper.getCursor().next();
                if (this.wrapper.isEndReached()) {
                    this.finishSong();
                }
            } while (this.wrapper.getCurrentSongElement().isSkipped());
        });
        EventBus.$on('note_error', () => this.wrapper.addError());
    }

}
</script>
