import {OSMD} from "opensheetmusicdisplay";
import Song from "./Song";
import SongElement from "./SongElement";
import {StaffMeasure} from "opensheetmusicdisplay/dist/src/MusicalScore/Graphical/StaffMeasure";

export default class SongWrapper {

    private osmd: OSMD;
    private measureList: Array<StaffMeasure>|null = [];

    constructor(element) {
        this.osmd = new OSMD(element);
    }

    public loadSong(song: Song): Promise<void> {
        return new Promise<void>((resolve) => {
            this.osmd.load(song.xml).then(() => {
                this.measureList = this.osmd.graphic.measureList;
                resolve();
            });
        });
    }

    public render(measureIndex: number, staffEntryIndex: number): void {
        this.osmd.zoom = 2.0;

        let x = 500;
        if (measureIndex === 0 && staffEntryIndex === 0) {
            x -= 250; // on the very first note, the offset is somehow 0
        }
        x -= this.measureList[measureIndex][0].stave.x * 2;

        this.osmd.container.style.transform = 'translateX(' + x + 'px)';
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

    public isSkipped(measureIndex: number, staffEntryIndex: number): boolean {
        if (this.getSongElementAt(measureIndex, staffEntryIndex).isPause()) {
            return true;
        }

        if (this.isEndOfTie(measureIndex, staffEntryIndex)) {
            return true;
        }

        return false;
    }

    public getNumberOfMeasures(): number {
        return this.measureList.length;
    }

    public getNumberOfStaffEntriesInMeasure(measureIndex): number {
        return this.measureList[measureIndex][0].staffEntries.length;
    }

    private isEndOfTie(measureIndex: number, staffEntryIndex: number): boolean {
        let element = this.getSongElementAt(measureIndex, staffEntryIndex);

        return this.measureList[measureIndex][0].vfTies.filter(staveTie => !!staveTie.last_note && staveTie.last_note.attrs.id === element.getVexFlowId()).length > 0;
    }
}
