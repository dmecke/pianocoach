<template>
    <div style="width: 10000px; transform: translateX(0)"></div>
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
        measureIndex: {
            type: Number,
            required: true,
        },
        staffEntryIndex: {
            type: Number,
            required: true,
        }
    },
    watch: {
        song() {
            this.loadSong();
            this.renderScore();
        },
        measureIndex() {
            this.renderScore();
        },
        staffEntryIndex() {
            this.renderScore();
        }
    }
})
export default class Score extends Vue {

    wrapper: SongWrapper|null = null;
    song: Song;
    measureIndex: number;
    staffEntryIndex: number;

    renderScore() {
        this.wrapper.highlightNote(this.measureIndex, this.staffEntryIndex);
        this.wrapper.render(this.measureIndex, this.staffEntryIndex);
    }

    loadSong() {
        this.wrapper.loadSong(this.song).then(() => {
            this.renderScore();
            this.$emit('loaded', this.wrapper);
        });
    }

    mounted() {
        this.wrapper = new SongWrapper(this.$el);
        this.loadSong();
    }
}
</script>
