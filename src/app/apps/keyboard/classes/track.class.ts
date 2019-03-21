import { Key } from './key.class';

const TIMESPAN = 1; // 1ms
const MAX_CYCLES = 5000; // 10s of 1ms cycle

export class Track {
  private cycle: number;
  private recording: boolean;

  private keys: Array<{ key: Key; cycle: number }>;

  constructor(private maxCycles: number = MAX_CYCLES) {
    this.recording = false;
  }

  public start(): void {
    this.cycle = 0;
    this.keys = new Array<{ key: Key; cycle: number }>();
    this.recording = true;
    this.loop();
  }

  public stop(): void {
    this.recording = false;
  }

  public isRecording(): boolean {
    return this.recording;
  }

  public regiserKey(key: Key): void {
    if (this.recording) {
      console.log(`key ${key.note} saved at ${this.cycle}`);
      this.keys.push({ key, cycle: this.cycle });
    }
  }

  private loop(): void {
    this.cycle += 1;
    if (this.cycle < this.maxCycles && this.recording) {
      setTimeout(() => this.loop(), TIMESPAN);
    } else {
      this.recording = false;
      console.log('recording end', this.cycle, this.keys);
    }
  }
}
