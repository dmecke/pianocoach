<template>
    <ul>
        <li v-for="(song, index) in songs" :key="index">
            <router-link :to="'/song/' + song.title">{{ song.title }}</router-link>
        </li>
    </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import Song from "../js/Song";
import SongRepository from "../js/SongRepository";

@Component
export default class PageSongs extends Vue {

    songs: Array<Song> = SongRepository.findAll();

}
</script>
