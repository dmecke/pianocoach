///<reference path="../../typings.d.ts"/>

import Song from "./Song";

import * as SongTonleiter from '../song/tonleiter.xml';
import * as SongDemons from '../song/demons.xml';
import * as SongStarWars from '../song/starwars.xml';

export default class SongRepository {

    public static find(name: string): Song {

        switch (name) {
            case 'tonleiter':
                return new Song(name, SongTonleiter);

            case 'demons':
                return new Song(name, SongDemons);

            case 'starwars':
                return new Song(name, SongStarWars);
        }
    }

    public static findAll(): Array<Song> {
        return [
            new Song('tonleiter', SongTonleiter),
            new Song('demons', SongDemons),
            new Song('starwars', SongStarWars),
        ]
    }

}
