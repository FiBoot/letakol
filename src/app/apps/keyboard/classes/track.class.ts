import { Key } from './key.class';
import { Player } from './player.class';
import { UUID } from 'angular2-uuid';
import { Utils } from 'src/app/services/utils/utils.service';

export class RecordedKey {
  constructor(public key: Key, public start: number, public end: number = 0) {}
}

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
    this.canvas = document.createElement('canvas');
    Object.assign(this.canvas, { width: this.cycle, height: 70 });
    this.ctx = this.canvas.getContext('2d');
    this.recordedKeys.forEach(({ key, start, end }) => {
      const keyHeight = 30; // TODO calc the key height from note
      this.ctx.beginPath();
      this.ctx.fillStyle = '#333';
      console.log(`drawing ${key.note.name} from ${start} to ${end - start}`);
      this.ctx.fillRect(start, keyHeight, end - start, 10);
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
