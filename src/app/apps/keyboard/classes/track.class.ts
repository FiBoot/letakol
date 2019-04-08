import { Key } from './key.class';
import { notes } from './notes';
import { UUID } from 'angular2-uuid';
import { Player } from 'src/app/classes/player.class';
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

  public viewDiv: HTMLDivElement;
  private progressDiv: HTMLDivElement;

  constructor() {
    super();
    this.stops.subscribe(() => this.genereCanvas());
  }

  public startCB(): void {
    this.keys = new Array<RecordedKey>();
    this.recordedKeys = new Array<RecordedKey>();
  }

  public genereCanvas(): void {
    // wrap
    this.viewDiv = document.createElement('div');
    Object.assign(this.viewDiv.style, { position: 'relative' });
    // progress
    this.progressDiv = document.createElement('div');
    Object.assign(this.progressDiv, { id: `progress_${this.uuid}` });
    Object.assign(this.progressDiv.style, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '2px',
      height: `${notes.length * NOTE_HEIGHT}px`,
      backgroundColor: 'green'
    });
    // create canvas
    const canvas = document.createElement('canvas');
    Object.assign(canvas, { width: this._cycle, height: notes.length * NOTE_HEIGHT });
    Object.assign(canvas.style, { border: '1px solid #111' });
    const ctx = canvas.getContext('2d');
    // draw notes
    ctx.fillStyle = '#aaa';
    ctx.fillRect(0, 0, this._cycle, notes.length * NOTE_HEIGHT);
    this.recordedKeys.forEach(({ key, start, end }) => {
      const noteHeight = notes.findIndex(note => note === key.note) * NOTE_HEIGHT;
      ctx.beginPath();
      ctx.fillStyle = key.sharped ? NOTE_COLORS.BLACK : NOTE_COLORS.WHITE;
      ctx.fillRect(start, noteHeight, end - start, 10);
      ctx.fillStyle = key.sharped ? NOTE_COLORS.WHITE : NOTE_COLORS.BLACK;
      ctx.font = `${NOTE_HEIGHT - 1}px`;
      ctx.fillText(key.note.name, start, noteHeight + NOTE_HEIGHT * 2 - 1);
    });
    // append element
    this.viewDiv.appendChild(canvas);
    this.viewDiv.appendChild(this.progressDiv);
  }

  public regiserKey(key: Key, pressed: boolean): void {
    if (this.playing) {
      if (pressed) {
        this.keys.push(new RecordedKey(key, this._cycle));
      } else {
        const recordedKey = Utils.first(
          this.keys.splice(this.keys.findIndex(k => k.key.note === key.note), 1)
        );
        if (recordedKey) {
          recordedKey.end = this._cycle;
          this.recordedKeys.push(recordedKey);
        }
      }
    }
  }

  public resetProgress(): void {
    Object.assign(this.progressDiv.style, { left: 0 });
  }

  public progress(cycle: number): void {
    if (cycle < this._cycle) {
      Object.assign(this.progressDiv.style, { left: `${cycle}px` });
    }
  }
}
