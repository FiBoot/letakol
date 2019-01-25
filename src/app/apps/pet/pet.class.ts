import { Utils } from 'src/app/services/utils/utils.service';

enum BEHAVIOR {
  IDLE,
  SLEEPY,
  PLAYFULL,
  ANGRY
}

class Position {
  constructor(public x: number = 0, public y: number = 0) { }
}

class BreathFunction {
  factor = 1;
  factorDir = 1;
  way = 1;
  constructor(private maxFactor: number = 20, private outputRatio: number = 3) { }
  get value(): number {
    this.factor += this.factorDir;
    switch (this.factor) {
      case this.maxFactor: this.factorDir = -1; break;
      case 0:
        this.factorDir = 1;
        this.way = -this.way;
        break;
    }
    let x = 0;
    for (let f = Math.abs(this.factor); f > 0; f--) { x += 1 / f; }
    return x * this.way / this.outputRatio;
  }
}

export class Pet {
  private readonly SIZE = 30;
  private readonly EYE_SIZE = 6;
  private readonly EYE_GAP = 10;
  private readonly EYE_FLICK_TIMESPAN = 50;
  private readonly IDLE_NEXTPOST_GAP = 50;
  private readonly IDLE_SPEED = 1;
  private readonly IDLE_NEXTPOS_FRAMESPAN = 100;

  private frame: number;
  private pos: Position;
  private breath: BreathFunction;
  private behavior: BEHAVIOR;
  private nextPos: Position;
  private nextPosFrame: number;


  constructor(private ctx: CanvasRenderingContext2D, private CSIZE: number = 500) {
    this.frame = 0;
    this.pos = new Position(this.CSIZE / 2, this.CSIZE / 2);
    this.breath = new BreathFunction();
    this.behavior = BEHAVIOR.ANGRY;
    this.nextPosFrame = 0;
  }

  public next(): void {
    [
      this.doIdle.bind(this),
      this.doSleepy.bind(this),
      this.doPlayfull.bind(this),
      this.doAngry.bind(this)
    ][this.behavior]();

    this.frame += 1;
  }

  public draw(): void {
    this.ctx.clearRect(0, 0, this.CSIZE, this.CSIZE);

    this.drawBody();
    this.drawEyes();
  }

  public setBehavior(behavior: BEHAVIOR): void {
    console.log('change behavior: ' + behavior);
    this.behavior = behavior;
  }

  private doIdle(): void {
    if (!this.nextPos) {
      this.genereNextPos();
    }
    if (this.nextPos) {
      this.pos.x += this.nextPos.x === this.pos.x
        ? 0 : this.nextPos.x > this.pos.x
          ? this.IDLE_SPEED : -this.IDLE_SPEED;
      this.pos.y += this.nextPos.y === this.pos.y
        ? 0 : this.nextPos.y > this.pos.y
          ? this.IDLE_SPEED : -this.IDLE_SPEED;
      if (this.pos.x === this.nextPos.x && this.pos.y === this.nextPos.y) {
        this.nextPos = null;
      }
    }
  }

  private doSleepy(): void {
  }

  private doPlayfull(): void {
  }

  private doAngry(): void {
  }

  private genereNextPos(): void {
    if (this.nextPosFrame < this.frame) {
      const sep = Utils.random(this.IDLE_NEXTPOST_GAP);
      const x = this.pos.x + (Utils.random(2) ? sep : -sep);
      const y = this.pos.y + (Utils.random(2) ? this.IDLE_NEXTPOST_GAP - sep : -(this.IDLE_NEXTPOST_GAP - sep));
      this.nextPos = new Position(x, y);
      this.nextPosFrame = this.frame + [this.IDLE_NEXTPOS_FRAMESPAN, 0, 0, 0][this.behavior];
    }
  }

  private drawBody(): void {
    this.ctx.beginPath();
    // bottom part
    this.ctx.moveTo(this.pos.x - this.SIZE, this.pos.y);
    this.ctx.bezierCurveTo(
      this.pos.x - this.SIZE, this.pos.y + this.SIZE,
      this.pos.x + this.SIZE, this.pos.y + this.SIZE,
      this.pos.x + this.SIZE, this.pos.y
    );
    // upper part
    this.ctx.moveTo(this.pos.x - this.SIZE, this.pos.y);
    this.ctx.bezierCurveTo(
      this.pos.x - this.SIZE, this.pos.y - this.SIZE + this.breath.value,
      this.pos.x + this.SIZE, this.pos.y - this.SIZE + this.breath.value,
      this.pos.x + this.SIZE, this.pos.y
    );
    this.ctx.stroke();
  }

  private drawEyes(): void {
    this.ctx.beginPath();
    [
      this.drawIdleEyes.bind(this),
      this.drawSleepyEyes.bind(this),
      this.drawIdleEyes.bind(this),
      this.drawAngryEyes.bind(this)
    ][this.behavior]();
    this.ctx.stroke();
  }

  private drawIdleEyes(): void {
    if (this.frame % this.EYE_FLICK_TIMESPAN === 0) {
      this.drawSleepyEyes();
    } else {
      // left
      this.ctx.arc(this.pos.x - this.EYE_GAP - (this.EYE_SIZE / 2), this.pos.y, this.EYE_SIZE / 2, 0, 2 * Math.PI);
      // right
      this.ctx.moveTo(this.pos.x + this.EYE_GAP + this.EYE_SIZE, this.pos.y);
      this.ctx.arc(this.pos.x + this.EYE_GAP + (this.EYE_SIZE / 2), this.pos.y, this.EYE_SIZE / 2, 0, 2 * Math.PI);
    }
  }

  private drawSleepyEyes(): void {
    // left
    this.ctx.moveTo(this.pos.x - this.EYE_GAP, this.pos.y);
    this.ctx.lineTo(this.pos.x - (this.EYE_GAP + this.EYE_SIZE), this.pos.y);
    // right
    this.ctx.moveTo(this.pos.x + this.EYE_GAP, this.pos.y);
    this.ctx.lineTo(this.pos.x + (this.EYE_GAP + this.EYE_SIZE), this.pos.y);
  }

  private drawAngryEyes(): void {
    const gap = this.EYE_GAP - 1, size = this.EYE_SIZE + 1;
    // left
    this.ctx.moveTo(this.pos.x - gap, this.pos.y + 2);
    this.ctx.lineTo(this.pos.x - (gap + size), this.pos.y + 2);
    this.ctx.lineTo(this.pos.x - (gap + size), this.pos.y - 2);
    this.ctx.closePath();
    // right
    this.ctx.moveTo(this.pos.x + gap, this.pos.y + 2);
    this.ctx.lineTo(this.pos.x + (gap + size), this.pos.y + 2);
    this.ctx.lineTo(this.pos.x + (gap + size), this.pos.y - 2);
    this.ctx.closePath();
  }

}
