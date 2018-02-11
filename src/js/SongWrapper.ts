import {OSMD} from "opensheetmusicdisplay";
import Song from "./Song";
import {StaffMeasure} from "opensheetmusicdisplay/dist/src/MusicalScore/Graphical/StaffMeasure";
import SongElement2 from "./SongElement";

export default class SongWrapper {

    private osmd: OSMD;
    private measureList: Array<StaffMeasure>|null = [];
    private errors: number = 0;

    constructor(element) {
        this.osmd = new OSMD(element);
    }

    public loadSong(song: Song): Promise<void> {
        return new Promise<void>((resolve) => {
            this.osmd.load(song.xml).then(() => {
                this.osmd.cursor.cursorElement.style.zIndex = 0;
                this.measureList = this.osmd.graphic.measureList;
                resolve();
            });
        });
    }

    public render(): void {
        this.osmd.render();
    }

    public reset(): void {
        this.osmd.cursor.reset();
        this.errors = 0;
    }

    public getCurrentSongElement(): SongElement2 {
        return new SongElement2(this.osmd.cursor.iterator.currentVoiceEntries);
    }

    private getNumberOfMeasures(): number {
        return this.osmd.sheet.sourceMeasures.length;
    }

    public progress(): number {
        return this.osmd.cursor.iterator.currentMeasureIndex / this.getNumberOfMeasures() * 100;
    }

    public addError(): void {
        this.errors++;
    }

    public getErrors(): number {
        return this.errors;
    }

}
