<template>
    <div></div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Song from "../js/Song";
import SongWrapper from "../js/SongWrapper";

@Component({
    props: {
        song: {
            type: Song,
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

    wrapper: SongWrapper|null = null;
    song: Song;

    renderScore() {
        this.wrapper.render();
        this.wrapper.osmd.cursor.show();
    }

    loadSong() {
        this.wrapper.loadSong(this.song).then(() => {
            this.renderScore();
            window.bus.$emit('song_loaded', this.wrapper);
        });
    }

    mounted() {
        this.wrapper = new SongWrapper(this.$el);
        this.loadSong();
    }

    public destroyed(): void {
        window.bus.$emit('song_unloaded');
    }

}
</script>
