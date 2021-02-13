import { Effect } from './effects';
import { Note } from './notes';
import * as Pizzicato from 'pizzicato';

export class Key {
  readonly sharped: boolean;

  private _sound: Pizzicato.Sound;
  private _appliedEffect: Array<Pizzicato.Effect> = [];

  // style states
  active: boolean = false;
  binding: boolean = false;

  constructor(public note: Note, effects: Array<Effect> = []) {
    this.sharped = Boolean(note.name.search('#') > -1);
    this._sound = new Pizzicato.Sound({
      source: 'wave',
      options: {
        volume: 0.25,
        frequency: this.note.frequency,
      },
    });
    this.applyEffects(effects);
  }

  applyEffects(effects: Array<Effect>): void {
    // remove current effects
    this._appliedEffect.forEach((effect) => this._sound.removeEffect(effect));
    this._appliedEffect = new Array<Pizzicato.Effect>();
    // create and add new effects
    effects.forEach((effect) => {
      const effectOptions = {};
      effect.params.forEach((param) => (effectOptions[param.name] = param.value));
      const pizzicatoEffect = new effect.ref(effectOptions);
      this._appliedEffect.push(pizzicatoEffect);
      this._sound.addEffect(pizzicatoEffect);
    });
  }

  soundSetting(volume: number, attack: number, release: number): void {
    this._sound.volume = volume;
    this._sound.attack = attack;
    this._sound.release = 1;
  }

  play(): void {
    this._sound.play();
  }

  stop(): void {
    this._sound.stop();
  }
}
