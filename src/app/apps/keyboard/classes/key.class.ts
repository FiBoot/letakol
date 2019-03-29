import { Note } from './notes';
import * as Pizzicato from 'pizzicato';

export class Key {
  private _sound: Pizzicato.Sound;
  readonly sharped: boolean;
  // style states
  active: boolean = false;
  binding: boolean = false;

  constructor(public note: Note) {
    this.sharped = Boolean(note.name.search('#') > -1);
    this._sound = new Pizzicato.Sound({
      source: 'wave',
      options: {
        volume: 0.25,
        frequency: note.frequency
      }
    });
    this._sound.addEffect(
      new Pizzicato.Effects.Distortion({
        gain: 0.25
      })
    );
  }

  play(): void {
    this._sound.play();
  }

  stop(): void {
    this._sound.stop();
  }
}
