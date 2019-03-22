import { Subject } from 'rxjs';

const TIMESPAN = 1; // 1ms
const MAX_CYCLES = 3000; // 10s of 1ms cycle

export class Player {
  private playing: boolean = false;
  protected cycle: number;
  public stops: Subject<boolean> = new Subject<boolean>();

  constructor(private maxCycles: number = MAX_CYCLES) {}

  public isPlaying(): boolean {
    return this.playing;
  }

  public start(): void {
    this.startCB();
    this.cycle = 0;
    this.playing = true;
    this.loop();
  }

  public stop(): void {
    this.playing = false;
    this.stops.next(true);
  }

  private loop(): void {
    this.loopCB();
    this.cycle += 1;
    if (this.cycle < this.maxCycles && this.playing) {
      setTimeout(() => this.loop(), TIMESPAN);
    } else {
      if (this.playing) {
        this.stop();
      }
    }
  }

  protected startCB() {}
  protected loopCB() {}
}
