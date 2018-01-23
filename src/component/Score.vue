<template>
    <div></div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { OSMD } from 'opensheetmusicdisplay';

@Component({
    props: {
        song: {
            type: String,
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
        }
    }
})
export default class Score extends Vue {

    osmd: OSMD|null = null;
    song: string;
    measureIndex: number;
    staffEntryIndex: number;

    renderScore() {
        // make all notes black
        this.osmd.graphic.measureList.forEach(measure => measure[0].staffEntries.forEach(staffEntry => staffEntry.vfNotes[1].setStyle({ fillStyle: 'black', strokeStyle: 'black' })));

        // make current notes red
        this.osmd.graphic.measureList[this.measureIndex][0].staffEntries[this.staffEntryIndex].vfNotes[1].setStyle({ fillStyle: 'red', strokeStyle: 'red' });

        this.osmd.zoom = 2.0;
        this.osmd.render();
    }

    loadSong() {
        this.osmd.load(this.song);
        this.$emit('loaded', this.osmd);
    }

    mounted() {
        this.osmd = new OSMD(this.$el, true);
        this.loadSong();
        this.renderScore();
    }
}
</script>
