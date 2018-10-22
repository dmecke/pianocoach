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
        song: {
            type: SongData,
            required: true,
        },
    },
    watch: {
        song() {
            this.loadSong();
            this.renderScore();
        }
    }
})
export default class Score extends Vue {

    wrapper: Song|null = null;
    song: SongData;

    renderScore() {
        this.wrapper.render();
        this.wrapper.getCursor().show();
    }

    loadSong() {
        this.wrapper.loadSong(this.song).then(() => {
            this.renderScore();
            EventBus.$emit('song_loaded', this.wrapper);
        });
    }

    mounted() {
        this.wrapper = new Song(this.$el);
        this.loadSong();
    }

    public destroyed(): void {
        EventBus.$emit('song_unloaded');
    }

}
</script>
