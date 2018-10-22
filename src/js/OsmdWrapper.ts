import {OpenSheetMusicDisplay} from "opensheetmusicdisplay";
import SongData from "./SongData";
import {SourceMeasure} from "opensheetmusicdisplay/build/dist/src/MusicalScore/VoiceData/SourceMeasure";
import {Cursor} from "opensheetmusicdisplay/build/dist/src/OpenSheetMusicDisplay/Cursor";

export default class OsmdWrapper
{
    private osmd: OpenSheetMusicDisplay;

    constructor(element) {
        this.osmd = new OpenSheetMusicDisplay(element);
    }

    public loadSong(songXml: string): Promise<void> {
        return new Promise<void>((resolve) => {
            this.osmd.load(songXml).then(() => {
                this.getCursor().cursorElement.style.zIndex = 0;
                resolve();
            });
        });
    }

    public render(): void {
        this.osmd.render();
    }

    public getSourceMeasures(): SourceMeasure[] {
        return this.osmd.sheet.SourceMeasures;
    }

    public getCursor(): Cursor {
        return this.osmd.cursor;
    }

    public getCursorIterator() {
        return this.getCursor().iterator;
    }
}
