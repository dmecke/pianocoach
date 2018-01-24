<template>
    <div>
        <v-btn color="indigo" dark @click.stop="highscore = true">Highscore</v-btn>
        <v-dialog v-model="highscore" max-width="500px">
            <v-card>
                <v-card-title><h3 class="headline">Highscore</h3></v-card-title>
                <v-card-text>
                    <v-list two-line v-if="songEntity.highscores.length > 0">
                        <v-list-tile v-for="highscore in songEntity.highscores">
                            <v-list-tile-content>
                                <v-list-tile-title>{{ highscore.errors }} Errors</v-list-tile-title>
                                <v-list-tile-sub-title>{{ highscore.date }}</v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                    <p v-else>No entries yet.</p>
                </v-card-text>
                <v-card-actions>
                    <v-btn flat @click.stop="highscore = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

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
    highscore: boolean = false;

    get songEntity(): SongEntity {
        return SongRepository.find(this.song);
    }

}
</script>
