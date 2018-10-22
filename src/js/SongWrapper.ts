import {OpenSheetMusicDisplay} from "opensheetmusicdisplay";
import Song from "./Song";
import SongElement from "./SongElement";
import {Cursor} from "opensheetmusicdisplay/build/dist/src/OpenSheetMusicDisplay/Cursor";

export default class SongWrapper {

    private osmd: OpenSheetMusicDisplay;
    private errors: number = 0;

    constructor(element) {
        this.osmd = new OpenSheetMusicDisplay(element);
    }

    public loadSong(song: Song): Promise<void> {
        return new Promise<void>((resolve) => {
            this.osmd.load(song.xml).then(() => {
                this.getCursor().cursorElement.style.zIndex = 0;
                resolve();
            });
        });
    }

    public render(): void {
        this.osmd.render();
    }

    public reset(): void {
        this.getCursor().reset();
        this.errors = 0;
    }

    public getCurrentSongElement(): SongElement {
        return new SongElement(this.getCursorIterator().CurrentVoiceEntries);
    }

    private getNumberOfMeasures(): number {
        return this.osmd.sheet.sourceMeasures.length;
    }

    public progress(): number {
        return this.getCursorIterator().CurrentMeasureIndex / this.getNumberOfMeasures() * 100;
    }

    public addError(): void {
        this.errors++;
    }

    public getErrors(): number {
        return this.errors;
    }

    public getCursor(): Cursor {
        return this.osmd.cursor;
    }

    private getCursorIterator() {
        return this.getCursor().iterator;
    }

    public isEndReached(): boolean {
        return this.getCursorIterator().EndReached;
    }
}
