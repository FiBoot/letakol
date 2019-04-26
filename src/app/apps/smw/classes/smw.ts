import { Canvas } from 'src/app/classes/canvas.class';

export class SMW extends Canvas {
  constructor(wrapper: HTMLDivElement) {
    super({ wrapper });

    this.render.fillStyle = '#eee';
    this.render.fillRect(0, 0, this.size, this.size);
  }

  onResize() {
    console.log('eh salut');
  }
  onClick(x: number, y: number) {
    console.log(`${x}, ${y}`);
  }
  
  keyCB(key: string): void {
    console.log(key)
  }
}
