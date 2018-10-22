///<reference path="../../typings.d.ts"/>

import SongData from "./SongData";

import * as SongTonleiter from '../song/tonleiter.xml';
import * as SongDemons from '../song/demons.xml';
import * as SongStarWars from '../song/starwars.xml';
import * as SongTetris from '../song/tetris.xml';

export default class SongRepository {

    public static find(name: string): SongData {

        switch (name) {
            case 'tonleiter':
                return new SongData(name, SongTonleiter);

            case 'demons':
                return new SongData(name, SongDemons);

            case 'starwars':
                return new SongData(name, SongStarWars);

            case 'tetris':
                return new SongData(name, SongTetris);
        }
    }

    public static findAll(): Array<SongData> {
        return [
            new SongData('tonleiter', SongTonleiter),
            new SongData('demons', SongDemons),
            new SongData('starwars', SongStarWars),
            new SongData('tetris', SongTetris),
        ]
    }

}
