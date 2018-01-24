<template>
    <div>
        <h2>Highscore</h2>
        <ul v-if="songEntity.highscores.length > 0">
            <li v-for="highscore in songEntity.highscores">
                <span>{{ highscore.errors }} Errors</span>
                <span>{{ highscore.date }}</span>
            </li>
        </ul>
        <p v-else>No entries yet.</p>

        <h2>Score</h2>
        <pc-song :song="songEntity"></pc-song>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Song from '../component/Song.vue';
import SongEntity from "../js/Song";
import SongRepository from "../js/SongRepository";

@Component({
    components: {
        'pc-song': Song
    },
    props: {
        song: {
            type: String,
            required: true,
        }
    }
})
export default class PageSong extends Vue {

    private song: string;

    get songEntity(): SongEntity {
        return SongRepository.find(this.song);
    }

}
</script>
