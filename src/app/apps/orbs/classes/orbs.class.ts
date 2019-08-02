import { Orb } from './orb.class';
import { Canvas } from 'src/app/classes/canvas.class';
import { Utils } from 'src/app/services/utils/utils.service';

const MASSES = ['#eee', '#ccc', '#aaa', '#888', '#666'];

export class Orbs extends Canvas {
  private _orbs: Array<Orb> = new Array<Orb>();

  constructor(wrapper: HTMLDivElement) {
    super({ wrapper, playerOption: { timespan: 30 } });

    this.start();
  }

  onClick(x: number, y: number): void {
    const orb = this.getOrbAtPos({ x, y });
    if (orb) {
      Utils.remove(this._orbs, orb);
    } else {
      const velocity = {
        x: Math.random() * (Utils.random(2) ? 1 : -1),
        y: Math.random() * (Utils.random(2) ? 1 : -1)
      };
      this._orbs.push(new Orb(x, y, velocity, this.unitSize, Utils.random(MASSES.length) + 1));
    }
  }

  loopCB(): void {
    this.clear();
    this.drawLimits();
    this._orbs.forEach(orb => orb.process());
    this.checkCollisions();
    this._orbs.forEach(orb => this.drawOrb(orb));
  }

  private drawLimits(): void {
    this.render.strokeStyle = '#000';
    this.render.strokeRect(0, 0, this.size, this.size);
  }

  private drawOrb(orb: Orb): void {
    // orb
    this.render.fillStyle = MASSES[orb.mass - 1];
    this.render.beginPath();
    this.render.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
    this.render.fill();
    // velocity
    this.render.strokeStyle = 'blue';
    this.render.beginPath();
    this.render.moveTo(orb.x, orb.y);
    this.render.lineTo(orb.x + orb.velocity.x * orb.radius, orb.y + orb.velocity.y * orb.radius);
    this.render.stroke();
  }

  private getOrbAtPos(pos: { x: number; y: number }): Orb | null {
    for (let i = 0; i < this._orbs.length; i++) {
      if (this._orbs[i].contain(pos.x, pos.y)) {
        return this._orbs[i];
      }
    }
    return null;
  }

  private checkWallCollision(orb: Orb) {
    if (
      (orb.x < orb.radius + 1 && orb.velocity.x < 0) ||
      (orb.x > this.size - orb.radius - 1 && orb.velocity.x > 0)
    ) {
      orb.velocity.x *= -1;
    }
    if (
      (orb.y < orb.radius + 1 && orb.velocity.y < 0) ||
      (orb.y > this.size - orb.radius - 1 && orb.velocity.y > 0)
    ) {
      orb.velocity.y *= -1;
    }
  }

  private checkOrbCollision(orb1: Orb, orb2: Orb): void {
    const distance = Math.sqrt(Math.pow(orb2.x - orb1.x, 2) + Math.pow(orb2.y - orb1.y, 2));

    if (distance <= orb1.radius + orb2.radius) {
      console.warn('colision');
      this.assignNewVelocities(orb1, orb2);
    }
  }

  private assignNewVelocities(orb1: Orb, orb2: Orb): void {
    // Find the new velocities
    const vel1 = {
      x:
        (orb1.velocity.x * (orb1.mass - orb2.mass) + 2 * orb2.mass * orb2.velocity.x) /
        (orb1.mass + orb2.mass),
      y:
        (orb1.velocity.y * (orb1.mass - orb2.mass) + 2 * orb2.mass * orb2.velocity.y) /
        (orb1.mass + orb2.mass)
    };
    const vel2 = {
      x: orb1.velocity.x - orb2.velocity.x + vel1.x,
      y: orb1.velocity.y - orb2.velocity.y + vel1.y
    };
    // Update the velocities
    orb1.velocity = vel1;
    orb2.velocity = vel2;
    orb1.process();
    orb2.process();
  }

  private checkCollisions(): void {
    if (this._orbs.length > 1) {
      this._orbs.forEach(orb1 => {
        this.checkWallCollision(orb1);
        this._orbs.forEach(orb2 => {
          if (orb1 !== orb2) {
            this.checkOrbCollision(orb1, orb2);
          }
        });
      });
    }
  }
}
