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
import SongEntity from '../js/Song';
import SongWrapper from "../js/SongWrapper";
import Highscore from "../js/Highscore";

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
    wrapper: SongWrapper|null = null;
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
        window.bus.$on('song_loaded', (wrapper) => this.wrapper = wrapper);
        window.bus.$on('key_pressed', (note) => {
            if (note === this.wrapper.getCurrentSongElement().getHalfTone()) {
                window.bus.$emit('note_played');
            } else {
                window.bus.$emit('note_error');
            }
        });
        window.bus.$on('note_played', () => {
            if (this.startedAt === null) {
                this.startedAt = Date.now();
            }
            do {
                this.wrapper.osmd.cursor.next();
                if (this.wrapper.osmd.cursor.iterator.endReached) {
                    this.finishSong();
                }
            } while (this.wrapper.getCurrentSongElement().isSkipped());
        });
        window.bus.$on('note_error', () => this.wrapper.addError());
    }

}
</script>
