<template>
    <div>
        <pc-song-selection @change="song = $event"></pc-song-selection>
        <pc-song :song="song"></pc-song>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import SongComponent from './Song.vue';
import Song from '../js/Song';
import SongSelection from './SongSelection.vue';

@Component({
    components: {
        'pc-song': SongComponent,
        'pc-song-selection': SongSelection,
    },
})
export default class App extends Vue {

    song: Song|null = null;

}
</script>
