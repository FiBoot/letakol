import { Orb } from './orb.class';
import { Canvas } from 'src/app/classes/canvas.class';
import { Utils } from 'src/app/services/utils/utils.service';

const MASSES = ['#eee', '#ccc', '#aaa'];

export class Orbs extends Canvas {
  private _orbs: Array<Orb> = new Array<Orb>();

  constructor(wrapper: HTMLDivElement) {
    super({ wrapper });

    this.start();
  }

  onClick(x: number, y: number): void {
    const velocity = {
      x: (this.size / 2 - x) / 10,
      y: (this.size / 2 - y) / 10
    };
    this._orbs.push(new Orb(x, y, velocity, this.unitSize, Utils.random(MASSES.length) + 1));
  }

  loopCB(): void {
    this.clear();
    const orbsToRemove = new Array<Orb>();
    // process
    this._orbs.forEach(orb => {
      orb.process();
      if (orb.outOfBounds(this.size)) {
        orbsToRemove.push(orb);
      }
    });
    // remove oob orbs
    orbsToRemove.forEach(orb => this._orbs.splice(this._orbs.indexOf(orb), 1));
    // collisions
    this.checkCollisions();
    // draw
    this._orbs.forEach(orb => this.drawOrb(orb));
  }

  private drawOrb(orb: Orb): void {
    this.render.fillStyle = MASSES[orb.mass - 1];
    this.render.beginPath();
    this.render.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
    this.render.fill();
    // texts
    const texts = [
      orb.id.slice(0, 5),
      `${Utils.fixed(orb.x, 2)}, ${Utils.fixed(orb.y, 2)}`,
      `${Utils.fixed(orb.velocity.x, 2)}, ${Utils.fixed(orb.velocity.y, 2)}`,
      `${orb.mass}`
    ];
    this.render.strokeText(texts[0], orb.x - orb.radius / 2, orb.y - orb.radius / 2, orb.diameter);
    this.render.strokeText(texts[1], orb.x - orb.radius / 2, orb.y, orb.diameter);
    this.render.strokeText(texts[2], orb.x - orb.radius / 2, orb.y + orb.radius / 2, orb.diameter);
    this.render.strokeText(texts[3], orb.x, orb.y + orb.radius, orb.diameter);
    this.render.stroke();
  }

  private checkOrbCollision(orb1: Orb, orb2: Orb): void {
    const dx = orb1.x - orb2.x;
    const dy = orb1.y - orb2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < orb1.radius + orb2.radius) {
      this.assignNewVelocities(orb1, orb2);
    }
  }

  private assignNewVelocities(orb1: Orb, orb2: Orb): void {
    const vel1 = {
      x:
        orb1.velocity.x * (orb1.mass - orb2.mass) +
        (2 * orb2.mass * orb2.velocity.x) / (orb1.mass + orb2.mass),
      y:
        orb1.velocity.y * (orb1.mass - orb2.mass) +
        (2 * orb2.mass * orb2.velocity.y) / (orb1.mass + orb2.mass)
    };
    const vel2 = {
      x:
        orb1.velocity.x * (orb2.mass - orb1.mass) +
        (2 * orb1.mass * orb1.velocity.x) / (orb1.mass + orb2.mass),
      y:
        orb1.velocity.y * (orb2.mass - orb1.mass) +
        (2 * orb1.mass * orb1.velocity.y) / (orb1.mass + orb2.mass)
    };
    orb1.velocity = vel1;
    orb2.velocity = vel2;
    orb1.process();
    orb2.process();
  }

  private checkCollisions(): void {
    if (this._orbs.length > 1) {
      this._orbs.forEach(orb1 =>
        this._orbs.forEach(orb2 => {
          if (orb1 !== orb2) {
            this.checkOrbCollision(orb1, orb2);
          }
        })
      );
    }
  }
}
