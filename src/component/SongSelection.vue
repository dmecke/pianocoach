<template>
    <select v-model="song" @change="change()">
        <option :value="s" v-for="s in songs">{{ s.title }}</option>
    </select>
</template>

<script lang="ts">
///<reference path="../../typings.d.ts"/>
import Vue from 'vue';
import Component from 'vue-class-component';
import Song from '../js/Song';

import * as SongTonleiter from '../song/tonleiter.xml';
import * as SongDemons from '../song/demons.xml';
import * as StarWars from '../song/starwars.xml';

@Component
export default class SongSelection extends Vue {

    song: Song = null;
    songs: Array<Song> = [
        new Song('tonleiter', SongTonleiter),
        new Song('demons', SongDemons),
        new Song('starwars', StarWars)
    ];

    change() {
        this.$emit('change', this.song);
    }

    created() {
        this.song = this.songs[0];
        this.change();
    }

}
</script>
