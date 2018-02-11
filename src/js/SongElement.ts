import {StaveNote} from 'vexflow/src/stavenote';
import {VoiceEntry} from "opensheetmusicdisplay/dist/src/MusicalScore/VoiceData/VoiceEntry";

export default class SongElement {

    private voiceEntries: VoiceEntry[];

    constructor(voiceEntries: VoiceEntry[]) {
        this.voiceEntries = voiceEntries;
    }

    public getHalfTone(): number {
        if (!this.voiceEntries) {
            return 0;
        }
        let voiceEntry = this.voiceEntries[0]; // @todo take all voices into account!
        let note = voiceEntry.notes[0] // @todo take all notes into account!

        return note.halfTone;
    }

    public isSkipped(): boolean {
        if (this.isPause()) {
            return true;
        }

        return false;
    }

    private isPause(): boolean {
        return this.getHalfTone() === 0;
    }

}
