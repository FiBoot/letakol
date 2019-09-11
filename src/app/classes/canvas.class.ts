import { Logger } from '../services/logger/logger.service';
import { Utils } from '../services/utils/utils.service';
import { Player, IPlayerOptions } from './player.class';

const DEFAULT_UNITS_PER_LINE = 20;
const DEFAULT_MAX_CANVAS_WIDTH = 600;

export class ICanvasOptions {
  wrapper: HTMLDivElement;
  unitsPerLine?: number;
  maxWidth?: number;
  playerOption?: IPlayerOptions;
}

export class Canvas extends Player {
  private _wrapper: HTMLDivElement;
  private _canvas: HTMLCanvasElement;
  private _render: CanvasRenderingContext2D;

  private _size: number;
  private _unitsPerLine: number;
  private _unitSize: number;
  private _maxWidth: number;

  constructor({
    wrapper,
    unitsPerLine = DEFAULT_UNITS_PER_LINE,
    maxWidth = DEFAULT_MAX_CANVAS_WIDTH,
    playerOption = {}
  }: ICanvasOptions) {
    super(playerOption);
    this._wrapper = wrapper;
    this._unitsPerLine = unitsPerLine;
    this._maxWidth = maxWidth;

    Logger.log(`Canvas initialized with ${Utils.fixed(1000 / this._timespan, 2)} frames per second`);

    // create canvas
    this._canvas = document.createElement('canvas');
    this._render = this._canvas.getContext('2d');
    this._wrapper.append(this._canvas);

    // on click
    this._canvas.addEventListener('click', (event: MouseEvent) => this.onClick(event.offsetX, event.offsetY));

    // on mouse
    this._canvas.addEventListener('mousedown', (event: MouseEvent) => this.onMouse(true, event.offsetX, event.offsetY));
    this._canvas.addEventListener('mouseup', (event: MouseEvent) => this.onMouse(false, event.offsetX, event.offsetY));
    this._canvas.addEventListener('mouseleave', (event: MouseEvent) =>
      this.onMouse(false, event.offsetX, event.offsetY)
    );
    this._canvas.addEventListener('mousemove', (event: MouseEvent) => this.onMouseMove(event.offsetX, event.offsetY));

    // on wheel
    this._canvas.addEventListener('wheel', (event: WheelEvent) => this.onScroll(event.deltaY > 0));

    // on resize
    window.addEventListener('resize', (event: UIEvent) => this.sizeCanvas());
  }

  public destory(): void {
    this.stop();
    this._wrapper.removeChild(this._canvas);
  }

  startCB() {
    this.sizeCanvas();
  }

  public clear(): void {
    this._render.clearRect(0, 0, this._size, this._size);
  }

  private sizeCanvas(): void {
    const size = Math.floor(this._wrapper.offsetWidth);
    this._size = size < this._maxWidth ? size : this._maxWidth;
    this._unitSize = this._size / this._unitsPerLine;
    this._render.canvas.width = this._size;
    this._render.canvas.height = this._size;
    this.onResize();
  }

  public get render(): CanvasRenderingContext2D {
    return this._render;
  }
  public get size(): number {
    return this._size;
  }
  public get halfSize(): number {
    return this.size / 2;
  }
  public get powSize(): number {
    return Math.pow(this.size, 2);
  }
  public get unitSize(): number {
    return this._unitSize;
  }
  public get unitsPerLine(): number {
    return this._unitsPerLine;
  }

  public set unitsPerLine(upl: number) {
    this._unitsPerLine = upl > 0 ? upl : 0;
    this.sizeCanvas();
  }

  protected onResize(): void {}
  protected onClick(x: number, y: number): void {}
  protected onScroll(up: boolean): void {}
  protected onMouse(pressed: boolean, x: number, y: number): void {}
  protected onMouseMove(x: number, y: number): void {}
}
