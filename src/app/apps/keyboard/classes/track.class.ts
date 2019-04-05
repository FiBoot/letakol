import { Key } from './key.class';
import { notes } from './notes';
import { Player } from './player.class';
import { UUID } from 'angular2-uuid';
import { Utils } from 'src/app/services/utils/utils.service';

export class RecordedKey {
  constructor(public key: Key, public start: number, public end: number = 0) {}
}

const NOTE_HEIGHT = 5;
const NOTE_COLORS = { WHITE: '#fff', BLACK: '#333' };

export class Track extends Player {
  readonly uuid: string = UUID.UUID();

  private keys: Array<RecordedKey>;
  public recordedKeys: Array<RecordedKey>;

  public canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  public startCB(): void {
    this.keys = new Array<RecordedKey>();
    this.recordedKeys = new Array<RecordedKey>();
  }

  public stopCB(): void {
    // create canvas
    this.canvas = document.createElement('canvas');
    Object.assign(this.canvas, { width: this.cycle, height: notes.length * NOTE_HEIGHT });
    Object.assign(this.canvas.style, { border: '1px solid #111' });
    this.ctx = this.canvas.getContext('2d');
    // draw notes
    this.ctx.fillStyle = '#aaa';
    this.ctx.fillRect(0, 0, this.cycle, notes.length * NOTE_HEIGHT);
    this.recordedKeys.forEach(({ key, start, end }) => {
      const noteHeight = notes.findIndex(note => note === key.note) * NOTE_HEIGHT;
      this.ctx.beginPath();
      this.ctx.fillStyle = key.sharped ? NOTE_COLORS.BLACK : NOTE_COLORS.WHITE;
      this.ctx.fillRect(start, noteHeight, end - start, 10);
      this.ctx.fillStyle = key.sharped ? NOTE_COLORS.WHITE : NOTE_COLORS.BLACK;
      this.ctx.font = `${NOTE_HEIGHT - 1}px`;
      this.ctx.fillText(key.note.name, start, noteHeight + NOTE_HEIGHT * 2 - 1);
    });
  }

  public regiserKey(key: Key, pressed: boolean): void {
    if (this.isPlaying()) {
      if (pressed) {
        this.keys.push(new RecordedKey(key, this.cycle));
      } else {
        const recordedKey = Utils.first(
          this.keys.splice(this.keys.findIndex(k => k.key.note === key.note), 1)
        );
        if (recordedKey) {
          recordedKey.end = this.cycle;
          this.recordedKeys.push(recordedKey);
        }
      }
    }
  }
}
