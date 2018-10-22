<template>
    <v-dialog :value="value" max-width="500px" scrollable>
        <v-card>
            <v-card-title><h3 class="headline">Highscore</h3></v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-data-table :items="highscores" hide-actions hide-headers v-if="highscores.length > 0">
                    <template slot="items" slot-scope="{ index, item: highscore }">
                        <td>{{ index + 1 }}.</td>
                        <td>{{ highscore.errors }} Errors</td>
                        <td>{{ highscore.time / 1000 }}s</td>
                        <td>{{ highscore.date }}</td>
                    </template>
                </v-data-table>
                <p v-else>No entries yet.</p>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn flat @click.stop="$emit('input', false)">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
    props: {
        value: {
            type: Boolean,
            required: true,
        },
        highscores: {
            type: Array,
            required: true,
        },
    },
})
export default class Highscore extends Vue
{
}
</script>
