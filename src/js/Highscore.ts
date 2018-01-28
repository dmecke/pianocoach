export default class Highscore {

    public errors: number;
    public time: number;
    public date: string;

    constructor(errors: number, time: number) {
        this.errors = errors;
        this.time = time;
        this.date = new Date().toLocaleString();
    }
}
