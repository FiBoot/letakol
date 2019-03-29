import { Note } from './notes';
import { Utils } from 'src/app/services/utils/utils.service';

const TIMESPAN = 5;
const VOLUME_TICK = 0.01;

export class Key {
  private _audioCtx: AudioContext = new AudioContext();
  private _oscilator: OscillatorNode;
  // private _lowering: boolean = false;
  readonly sharped: boolean;

  // style states
  active: boolean = false;
  binding: boolean = false;

  constructor(public note: Note) {
    this.sharped = Boolean(note.name.search('#') > -1);

    this._oscilator = this._audioCtx.createOscillator();
    this._oscilator.frequency.value = note.frequency;
    this._oscilator.start(0);
  }

  play(type: OscillatorType = 'triangle'): void {
    this._oscilator.type = type;
    this._oscilator.connect(this._audioCtx.destination);
  }

  stop(): void {
    this._oscilator.disconnect();
  }

  // public play(): void {
  //   this._lowering = false;
  //   this.audio.volume = 1;
  //   this.audio.currentTime = 0;
  //   this.audio.play();
  // }

  // public stop(): void {
  //   this._lowering = true;
  //   this.lower();
  // }

  // private lower(): void {
  //   if (this._lowering) {
  //     if (this.audio.volume > 0) {
  //       this.audio.volume = Utils.fixed(this.audio.volume - VOLUME_TICK, 2);
  //       setTimeout(() => this.lower(), TIMESPAN);
  //     } else {
  //       this._lowering = false;
  //       this.audio.pause();
  //     }
  //   }
  // }
}
