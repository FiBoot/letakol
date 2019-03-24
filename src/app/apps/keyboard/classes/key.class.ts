import { Utils } from 'src/app/services/utils/utils.service';

export const enum ENote {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
  As = 'A^',
  Bs = 'B^',
  Cs = 'C^',
  Ds = 'D^',
  Es = 'E^',
  Fs = 'F^',
  Gs = 'G^'
}

const TIMESPAN = 5;
const VOLUME_TICK = 0.01;

export class Key {
  readonly note: string;
  private audio: HTMLAudioElement;
  private lowering: boolean = false;

  public active: boolean = false;
  public binding: boolean = false;

  constructor(note: ENote, public keyBind: string, readonly sharped: boolean = false) {
    this.note = sharped ? `${note}#` : note;
    this.audio = new Audio();
    this.audio.src = `/assets/keyboard-notes/${this.note
      .replace('^', 'sup')
      .replace('#', 'sharp')}.wav`;
    this.audio.loop = true;
    this.audio.load();
  }

  public play(): void {
    this.lowering = false;
    this.audio.volume = 1;
    this.audio.currentTime = 0;
    this.audio.play();
  }

  public stop(): void {
    this.lowering = true;
    this.lower();
  }

  private lower(): void {
    if (this.lowering) {
      if (this.audio.volume > 0) {
        this.audio.volume = Utils.fixed(this.audio.volume - VOLUME_TICK, 2);
        setTimeout(() => this.lower(), TIMESPAN);
      } else {
        this.lowering = false;
        this.audio.pause();
      }
    }
  }
}
