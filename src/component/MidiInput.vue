<template>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Song from '../js/Song';
import SongWrapper from "../js/SongWrapper";

@Component({
    props: {
        song: {
            type: Song,
            required: true,
        },
        measureIndex: {
            type: Number,
            required: true,
        },
        staffEntryIndex: {
            type: Number,
            required: true,
        },
        wrapper: {
            type: SongWrapper,
            required: false,
        }
    },
})
export default class MidiInput extends Vue {

    song: Song;
    measureIndex: number;
    staffEntryIndex: number;
    wrapper: SongWrapper;

    get currentNote() {
        return this.wrapper.getSongElementAt(this.measureIndex, this.staffEntryIndex).getHalfTone();
    }

    codeToNote(code) {
        return code - 12;
    }

    process(note) {
        if (note === this.currentNote) {
            this.$emit('notePlayed');
        } else {
            this.$emit('noteError');
        }
    }

    created() {
        let component = this;
        window.navigator.requestMIDIAccess()
            .then(access => {
                let inputs = access.inputs.values();
                for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
                    input.value.onmidimessage = function(message) {
                        let noteCode = message.data[1];
                        let velocity = message.data[2];
                        let type = message.data[0];

                        if (type === 144 && velocity > 0) {
                            // key pressed
                            component.process(component.codeToNote(noteCode));
                        }
                        if (type === 128 || velocity === 0) {
                            // key released
                        }
                    }
                }
            });
    }
}
</script>