<template>
    <select v-model="song" @change="change()">
        <option :value="s" v-for="s in songs">{{ s.title }}</option>
    </select>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Song from '../js/Song';

import SongRepository from "../js/SongRepository";

@Component
export default class SongSelection extends Vue {

    song: Song = null;
    songs: Array<Song> = SongRepository.findAll();

    change() {
        this.$emit('change', this.song);
    }

    created() {
        this.song = this.songs[0];
        this.change();
    }

}
</script>
