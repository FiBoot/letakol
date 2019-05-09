import { Particule } from './particule.class';
import { Canvas } from 'src/app/classes/canvas.class';
import { Utils } from 'src/app/services/utils/utils.service';

const TOTALY_ARBITRARY_NUMBER = 0;
const PARTICULE_SPEED = 1;

export class Perlain extends Canvas {
  particules: Array<Particule>;

  constructor(wrapper: HTMLDivElement) {
    super({ wrapper, playerOption: { timespan: 100 } });

    this.particules = this.genereParticules(this.size, true);

    this.start();
  }

  private genereParticules(max: number, random: boolean = false): Array<Particule> {
    const particules = new Array<Particule>();
    for (let i = 0; i < TOTALY_ARBITRARY_NUMBER; i++) {
      particules.push(new Particule());
    }
    return particules;
  }

  onResize(): void {
    this.draw();
  }

  onClick(x: number, y: number, ox: number, oy: number): void {
    const np = new Particule(ox, oy, Utils.random(this.size));
    console.log(np);
    this.particules.push(np);
  }

  loopCB(): void {
    this.draw();
  }

  private moveParticule(p: Particule): void {
    const move = Utils.random(2) ? PARTICULE_SPEED : -PARTICULE_SPEED;
    switch (Utils.random(5)) {
      case 0:
        p.x = Utils.contain(p.x + move);
        break;
      case 1:
        p.y = Utils.contain(p.y + move);
        break;
      case 2:
      case 3:
      case 4:
        p.z = Utils.contain(p.z + move * 10);
      default:
    }
  }

  private draw(): void {
    this.render.clearRect(0, 0, this.size, this.size);
    if (this.particules) {
      this.particules.forEach(p => {
        this.moveParticule(p);

        this.render.beginPath();
        this.render.arc(p.x, p.y, 10 * (p.z / this.size), 0, Math.PI * 2);
        this.render.stroke();
      });
    }
  }
}
