export default class Highscore {

    public errors: number;
    public date: string;

    constructor(errors: number) {
        this.errors = errors;
        this.date = new Date().toLocaleString();
    }
}
