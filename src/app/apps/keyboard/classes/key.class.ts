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

export class Key {
  readonly note: string;
  private audio: HTMLAudioElement;
  public active = false;
  public binding = false;

  constructor(note: ENote, public keyBind: string, readonly sharped: boolean = false) {
    this.note = sharped ? `${note}#` : note;
    this.audio = new Audio();
    this.audio.src = `/assets/keyboard-notes/${this.note
      .replace('^', 'superior')
      .replace('#', 'sharp')}.mp3`;
    this.audio.loop = true;
    this.audio.load();
  }

  public play(): void {
    this.audio.currentTime = 0;
    this.audio.play();
  }
  public stop(): void {
    this.audio.pause();
  }
}
