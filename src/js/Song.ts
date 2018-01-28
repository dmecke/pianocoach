import Highscore from "./Highscore";

export default class Song {

    title: string;
    xml: string;
    highscores: Array<Highscore> = [];

    constructor(title: string, xml) {
        this.title = title;
        this.xml = xml;

        this.loadHighscores();
    }

    public addHighscore(highscore: Highscore): void {
        this.highscores.push(highscore);
        this.highscores.sort((a: Highscore, b: Highscore) => {
            if (a.errors > b.errors) {
                return 1;
            }

            if (b.errors > a.errors) {
                return -1;
            }

            if (a.time > b.time) {
                return 1;
            }

            if (b.time > a.time) {
                return -1;
            }

            return 0;
        });

        window.localStorage.setItem(this.getItemName(), JSON.stringify(this.highscores));
    }

    private loadHighscores(): void {
        let highscore = window.localStorage.getItem(this.getItemName());
        this.highscores = highscore === null ? [] : JSON.parse(highscore);
    }

    private getItemName(): string {
        return 'highscore_' + this.title;
    }
}
