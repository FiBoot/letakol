import { Looper, ILooperOptions } from './looper.class';
import { Coord } from './coord.class';
import { Utils } from '../services/utils/utils.service';
import { Logger } from '../services/logger/logger.service';

const DEFAULT_UNITS_PER_LINE = 20;
const DEFAULT_MAX_CANVAS_WIDTH = 800;

export class ICanvasOptions {
  wrapper: HTMLDivElement;
  name?: string;
  unitsPerLine?: number;
  maxWidth?: number;
  looperOption?: ILooperOptions;
}

export class Canvas extends Looper {
  private _wrapper: HTMLDivElement;
  private _name: string;
  private _canvas: HTMLCanvasElement;
  private _render: CanvasRenderingContext2D;

  private _size: number;
  private _unitsPerLine: number;
  private _unitSize: number;
  private _maxWidth: number;

  constructor({
    wrapper,
    name = '',
    unitsPerLine = DEFAULT_UNITS_PER_LINE,
    maxWidth = DEFAULT_MAX_CANVAS_WIDTH,
    looperOption = {},
  }: ICanvasOptions) {
    super(looperOption);
    this._wrapper = wrapper;
    this._name = name;
    this._unitsPerLine = unitsPerLine;
    this._maxWidth = maxWidth;

    // create canvas
    this._canvas = document.createElement('canvas');
    this._render = this._canvas.getContext('2d');
    this._wrapper.append(this._canvas);

    const cancelEvent = (event: MouseEvent, cb) => {
      event.preventDefault();
      return cb;
    };

    // on click
    this._canvas.addEventListener('click', (event: MouseEvent) =>
      cancelEvent(event, this.onClick(event.offsetX, event.offsetY))
    );
    // on mouse
    this._canvas.addEventListener('mousedown', (event: MouseEvent) =>
      cancelEvent(event, this.onMouse(true, event.offsetX, event.offsetY))
    );
    this._canvas.addEventListener('mouseup', (event: MouseEvent) =>
      cancelEvent(event, this.onMouse(false, event.offsetX, event.offsetY))
    );
    this._canvas.addEventListener('mousemove', (event: MouseEvent) =>
      cancelEvent(event, this.onMouseMove(event.offsetX, event.offsetY))
    );
    this._canvas.addEventListener('mouseleave', (event: MouseEvent) => cancelEvent(event, this.onMouseLeave()));
    // on wheel
    this._canvas.addEventListener('wheel', (event: WheelEvent) => this.onScroll(event.deltaY > 0));
    // on resize
    window.addEventListener('resize', (event: UIEvent) => this.sizeCanvas());

    const frames = Utils.fixed(1000 / this._timespan, 2);
    Logger.log(`[Canvas] '${this._name}' initialized with ${frames} frames per second.`);

    this.sizeCanvas();
  }

  public destroy(): void {
    this.stop();
    this._wrapper.removeChild(this._canvas);
    Logger.log(`[Canvas] '${this._name}' destroyed.`);
  }

  startCB() {
    this.sizeCanvas();
  }

  public clear(): void {
    this._render.clearRect(0, 0, this._size, this._size);
  }

  /**
   * Convert a mouse point to the unit it belongs
   *
   * @param {Coord} point given point coord
   * @returns {Coord} unit coord
   * @memberof Canvas
   */
  public convertPointToUnit(point: Coord): Coord {
    const x = Math.floor(point.x / this.us);
    const y = Math.floor(point.y / this.us);
    return new Coord(x, y);
  }

  public drawUnit(x: number, y: number, color: string | CanvasGradient | CanvasPattern): void {
    this._render.fillStyle = color;
    this._render.fillRect(Math.floor(x * this.us), Math.floor(y * this.us), Math.ceil(this.us), Math.ceil(this.us));
  }

  private sizeCanvas(): void {
    const size = Utils.reduce(Math.floor(this._wrapper.offsetWidth), this._maxWidth);
    if (size !== this._size) {
      this._size = size;
      this._unitSize = this._size / this._unitsPerLine;
      this._render.canvas.width = this._size;
      this._render.canvas.height = this._size;
      this.onResize();
    }
  }

  public get render(): CanvasRenderingContext2D {
    return this._render;
  }
  public get size(): number {
    return this._size;
  }
  /**
   * Half size
   */
  public get hs(): number {
    return this.size / 2;
  }
  /**
   * Pow size
   */
  public get ps(): number {
    return Math.pow(this.size, 2);
  }
  /**
   * Unit size
   */
  public get us(): number {
    return this._unitSize;
  }
  /**
   * Half unist size
   */
  public get hus(): number {
    return this._unitSize / 2;
  }
  /**
   * Unit per lines
   */
  public get upl(): number {
    return this._unitsPerLine;
  }

  public set upl(upl: number) {
    this._unitsPerLine = upl > 0 ? upl : 0;
    this.sizeCanvas();
  }

  protected onResize(): void {}
  protected onClick(x: number, y: number): void {}
  protected onScroll(up: boolean): void {}
  protected onMouse(pressed: boolean, x: number, y: number): void {}
  protected onMouseLeave(): void {}
  protected onMouseMove(x: number, y: number): void {}
}
