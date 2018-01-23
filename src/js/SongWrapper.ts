import {OSMD} from "opensheetmusicdisplay";
import Song from "./Song";
import SongElement from "./SongElement";
import {StaffMeasure} from "opensheetmusicdisplay/dist/src/MusicalScore/Graphical/StaffMeasure";

export default class SongWrapper {

    private osmd: OSMD;
    private measureList: Array<StaffMeasure>|null = [];

    constructor(element) {
        this.osmd = new OSMD(element, true);
    }

    public loadSong(song: Song): Promise<void> {
        return new Promise<void>((resolve) => {
            this.osmd.load(song.xml).then(() => {
                this.measureList = this.osmd.graphic.measureList;
                resolve();
            });
        });
    }

    public render(): void {
        this.osmd.zoom = 2.0;
        this.osmd.render();
    }

    public getSongElementAt(measureIndex: number, staffEntryIndex: number): SongElement {
        return new SongElement(this.measureList[measureIndex][0].staffEntries[staffEntryIndex]);
    }

    public highlightNote(measureIndex: number, staffEntryIndex: number): void {
        // make all notes black
        this.measureList.forEach(measure => measure[0].staffEntries.forEach(staffEntry => staffEntry.vfNotes[1].setStyle({ fillStyle: 'black', strokeStyle: 'black' })));

        // make current notes red
        this.measureList[measureIndex][0].staffEntries[staffEntryIndex].vfNotes[1].setStyle({ fillStyle: 'red', strokeStyle: 'red' });
    }

    public getNumberOfMeasures(): number {
        return this.measureList.length;
    }

    public getNumberOfStaffEntriesInMeasure(measureIndex): number {
        return this.measureList[measureIndex][0].staffEntries.length;
    }
}
