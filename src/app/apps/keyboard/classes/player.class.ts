import { Subject } from 'rxjs';

const TIMESPAN = 1; // 1ms
const MAX_CYCLES = 3000; // 10s of 1ms cycle

export class Player {
  private playing: boolean = false;
  protected cycle: number;
  public stops: Subject<void> = new Subject();

  constructor(private maxCycles: number = MAX_CYCLES) {}

  public isPlaying(): boolean {
    return this.playing;
  }

  public start(): void {
    this.cycle = 0;
    this.playing = true;
    this.startCB();
    this.loop();
  }

  public stop(): void {
    this.playing = false;
    this.stopCB();
    this.stops.next();
  }

  private loop(): void {
    this.cycle += 1;
    this.loopCB();
    if (this.cycle < this.maxCycles && this.playing) {
      setTimeout(() => this.loop(), TIMESPAN);
    } else {
      if (this.playing) {
        this.stop();
      }
    }
  }

  protected startCB(): void {}
  protected stopCB(): void {}
  protected loopCB(): void {}
}
