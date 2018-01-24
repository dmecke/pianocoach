<template>
    <v-app>
        <v-navigation-drawer :clipped="$vuetify.breakpoint.width > 1264" fixed app v-model="drawer">
            <v-list>
                <v-list-tile to="/songs" ripple>
                    <v-list-tile-action>
                        <v-icon>{{ 'library_music' }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Songs</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar fixed app dark clipped-left color="indigo">
            <v-toolbar-title>
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                Piano Coach
            </v-toolbar-title>
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

@Component
export default class App extends Vue {

    drawer: boolean = true;

}
</script>
