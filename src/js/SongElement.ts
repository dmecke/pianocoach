import {VexFlowStaffEntry} from "opensheetmusicdisplay/dist/src/MusicalScore/Graphical/VexFlow/VexFlowStaffEntry";
import {StaveNote} from 'opensheetmusicdisplay/external/vexflow/vexflow';

export default class SongElement {

    private element: VexFlowStaffEntry;

    constructor(element: VexFlowStaffEntry) {
        this.element = element;
    }

    public getHalfTone(): number {
        return this.element.sourceStaffEntry.voiceEntries[0].notes[0].halfTone;
    }

    public isPause(): boolean {
        return this.getNote().noteType === 'r';
    }

    public getVexFlowId(): string {
        return this.getNote().attrs.id;
    }

    public getDuration(): string {
        return this.getNote().duration;
    }

    private getNote(): StaveNote {
        return this.element.vfNotes[1];
    }

}
