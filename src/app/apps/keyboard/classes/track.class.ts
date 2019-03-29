import { Key } from './key.class';
import { Player } from './player.class';
import { Utils } from 'src/app/services/utils/utils.service';

export class RecordedKey {
  constructor(public key: Key, public start: number, public end: number = 0) {}
}

export class Track extends Player {
  private keys: Array<RecordedKey>;
  public recordedKeys: Array<RecordedKey>;

  public startCB(): void {
    this.keys = new Array<RecordedKey>();
    this.recordedKeys = new Array<RecordedKey>();
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
