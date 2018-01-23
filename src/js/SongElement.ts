import {VexFlowStaffEntry} from "opensheetmusicdisplay/dist/src/MusicalScore/Graphical/VexFlow/VexFlowStaffEntry";

export default class SongElement {

    private element: VexFlowStaffEntry;

    constructor(element: VexFlowStaffEntry) {
        this.element = element;
    }

    public getHalfTone(): number {
        return this.element.sourceStaffEntry.voiceEntries[0].notes[0].halfTone;
    }

    public isPause(): boolean {
        return this.element.vfNotes[1].noteType === 'r';
    }

}
