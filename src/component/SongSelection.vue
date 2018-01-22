<template>
    <select v-model="song" @change="change()">
        <option value="tonleiter">Tonleiter</option>
        <option value="demons">Demons</option>
        <option value="starwars">Star Wars</option>
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

    song: string = 'tonleiter';
    songs: object = {
        tonleiter: new Song(SongTonleiter),
        demons: new Song(SongDemons),
        starwars: new Song(StarWars)
    };

    change() {
        this.$emit('change', this.songs[this.song]);
    }

    created() {
        this.change();
    }

}
</script>
