<template>
    <div>
        <pc-highscore v-model="showHighscore" :highscores="songData.highscores"></pc-highscore>
        <pc-song :song-data="songData"></pc-song>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Song from '../component/Song.vue';
import Highscore from "../component/Highscore.vue";
import SongData from "../js/SongData";
import SongRepository from "../js/SongRepository";
import {EventBus} from "../js/EventBus";

@Component({
    components: {
        'pc-song': Song,
        'pc-highscore': Highscore,
    },
    props: {
        song: {
            type: String,
            required: true,
        },
    },
})
export default class PageSong extends Vue {

    private song: string;
    private showHighscore: boolean = false;

    get songData(): SongData {
        return SongRepository.find(this.song);
    }

    created(): void {
        EventBus.$on('show_highscore', () => this.showHighscore = true);
    }

}
</script>
