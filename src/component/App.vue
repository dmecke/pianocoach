<template>
    <v-app light>
        <v-toolbar fixed app dark clipped-left color="indigo">
            <v-toolbar-title>Piano Coach</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="showHighscore()" v-if="$route.name === 'song'"><v-icon>format_list_numbered</v-icon></v-btn>
            <v-btn icon :to="{ name: 'songs' }" v-if="$route.name === 'song'"><v-icon>queue_music</v-icon></v-btn>
        </v-toolbar>
        <v-content>
            <router-view></router-view>
        </v-content>
        <v-footer></v-footer>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import SongWrapper from "../js/SongWrapper";

@Component
export default class App extends Vue {

    public errors: number = 0;

    private showHighscore(): void {
        window.bus.$emit('show_highscore');
    }

    public mounted(): void {
        window.bus.$on('song_loaded', (song) => this.song = song);
        window.bus.$on('song_unloaded', () => this.song = null);
    }

}
</script>
