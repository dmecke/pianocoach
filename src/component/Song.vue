<template>
    <div>
        <div style="text-align: center">
            <v-progress-circular :size="50" :value="progress" v-if="song">{{ song.getErrors() }}</v-progress-circular>
        </div>
        <pc-score :song-data="songData"></pc-score>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Score from './Score.vue';
import SongData from '../js/SongData';
import SongEntity from "../js/Song";
import Highscore from "../js/Highscore";
import {EventBus} from "../js/EventBus";

@Component({
    components: {
        'pc-score': Score,
    },
    props: {
        songData: {
            type: SongData,
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

    songData: SongData|null;

    startedAt: number = null;
    song: SongEntity|null = null;
    progress: number = 0;

    finishSong() {
        this.songData.addHighscore(new Highscore(this.song.getErrors(), Date.now() - this.startedAt));
        this.resetSong();
    }

    resetSong() {
        this.startedAt = null;
        this.song.reset();
    }

    public created(): void {
        EventBus.$on('song_loaded', (song) => this.song = song);
        EventBus.$on('key_pressed', (note) => {
            if (note === this.song.getCurrentSongElement().getHalfTone()) {
                EventBus.$emit('note_played');
            } else {
                EventBus.$emit('note_error');
            }
            this.progress = this.song.progress();
        });
        EventBus.$on('note_played', () => {
            if (this.startedAt === null) {
                this.startedAt = Date.now();
            }
            do {
                this.song.getCursor().next();
                if (this.song.isEndReached()) {
                    this.finishSong();
                }
            } while (this.song.getCurrentSongElement().isSkipped());
        });
        EventBus.$on('note_error', () => this.song.addError());
    }

}
</script>
