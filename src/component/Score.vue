<template>
    <div></div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import SongData from "../js/SongData";
import Song from "../js/Song";
import {EventBus} from "../js/EventBus";

@Component({
    props: {
        songData: {
            type: SongData,
            required: true,
        },
    },
    watch: {
        songData() {
            this.loadSong();
            this.renderScore();
        }
    }
})
export default class Score extends Vue {

    song: Song|null = null;
    songData: SongData;

    renderScore() {
        this.song.render();
        this.song.getCursor().show();
    }

    loadSong() {
        this.song.loadSong(this.songData).then(() => {
            this.renderScore();
            EventBus.$emit('song_loaded', this.song);
        });
    }

    mounted() {
        this.song = new Song(this.$el);
        this.loadSong();
    }

    public destroyed(): void {
        EventBus.$emit('song_unloaded');
    }
}
</script>
