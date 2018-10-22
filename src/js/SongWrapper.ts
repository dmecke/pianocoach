import SongData from "./Song";
import SongElement from "./SongElement";
import {Cursor} from "opensheetmusicdisplay/build/dist/src/OpenSheetMusicDisplay/Cursor";
import OsmdWrapper from "./OsmdWrapper";

export default class SongWrapper {

    private osmdWrapper: OsmdWrapper;
    private errors: number = 0;

    constructor(element) {
        this.osmdWrapper = new OsmdWrapper(element);
    }

    public loadSong(song: SongData): Promise<void> {
        return this.osmdWrapper.loadSong(song.xml);
    }

    public render(): void {
        this.osmdWrapper.render();
    }

    public reset(): void {
        this.getCursor().reset();
        this.errors = 0;
    }

    public getCurrentSongElement(): SongElement {
        return new SongElement(this.osmdWrapper.getCursorIterator().CurrentVoiceEntries);
    }

    private getNumberOfMeasures(): number {
        return this.osmdWrapper.getSourceMeasures().length;
    }

    public progress(): number {
        return this.osmdWrapper.getCursorIterator().CurrentMeasureIndex / this.getNumberOfMeasures() * 100;
    }

    public addError(): void {
        this.errors++;
    }

    public getErrors(): number {
        return this.errors;
    }

    public getCursor(): Cursor {
        return this.osmdWrapper.getCursor();
    }

    public isEndReached(): boolean {
        return this.osmdWrapper.getCursorIterator().EndReached;
    }
}
