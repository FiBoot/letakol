import { Key } from './key.class';
import { Utils } from 'src/app/services/utils/utils.service';

const TIMESPAN = 1; // 1ms
const MAX_CYCLES = 3000; // 10s of 1ms cycle

class RecordedKey {
  constructor(public key: Key, public cycle: number, public duration: number = 0) {}
}

export class Track {
  private recording: boolean = false;
  private cycle: number;

  private recordedKeys: Array<RecordedKey>;
  private keys: Array<RecordedKey>;

  constructor(private maxCycles: number = MAX_CYCLES) {}

  public start(): void {
    console.warn('recording starts');
    this.cycle = 0;
    this.keys = new Array<RecordedKey>();
    this.recordedKeys = new Array<RecordedKey>();
    this.recording = true;
    this.loop();
  }

  public stop(): void {
    this.recording = false;
    console.warn('recording stops');
    console.log(this.recordedKeys);
  }

  public isRecording(): boolean {
    return this.recording;
  }

  public regiserKey(key: Key, pressed: boolean): void {
    if (this.recording) {
      if (pressed) {
        this.keys.push(new RecordedKey(key, this.cycle));
      } else {
        const recordedKey = Utils.first(
          this.keys.splice(this.keys.findIndex(k => k.key.note === key.note), 1)
        );
        recordedKey.duration = this.cycle - recordedKey.cycle;
        console.log(`pushing key`, recordedKey);
        this.recordedKeys.push(recordedKey);
      }
    }
  }

  private loop(): void {
    this.cycle += 1;
    if (this.cycle < this.maxCycles && this.recording) {
      setTimeout(() => this.loop(), TIMESPAN);
    } else {
      this.stop();
    }
  }
}
