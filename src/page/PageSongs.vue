<template>
    <v-container grid-list-xl>
        <v-layout>
            <v-flex v-for="(song, index) in songs" :key="index">
                <v-card>
                    <v-card-media height="200" class="indigo">
                    </v-card-media>
                    <v-card-title style="position: relative" primary-title>
                        <h2 class="headline">{{ song.title }}</h2>
                        <v-btn fab color="secondary" absolute top right :to="'/song/' + song.title"><v-icon>play_arrow</v-icon></v-btn>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
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
