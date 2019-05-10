import { Player, IPlayerOptions } from './player.class';

const DEFAULT_UNITS_PER_LINE = 20;

export class ICanvasOptions {
  wrapper: HTMLDivElement;
  unitsPerLine?: number;
  playerOption?: IPlayerOptions;
}

export class Canvas extends Player {
  private _wrapper: HTMLDivElement;
  private _canvas: HTMLCanvasElement;
  private _render: CanvasRenderingContext2D;

  private _size: number;
  private _unitsPerLine: number;
  private _unitSize: number;

  constructor({
    wrapper,
    unitsPerLine = DEFAULT_UNITS_PER_LINE,
    playerOption = {}
  }: ICanvasOptions) {
    super(playerOption);
    this._unitsPerLine = unitsPerLine;
    this._wrapper = wrapper;

    // create canvas
    this._canvas = document.createElement('canvas');
    this._render = this._canvas.getContext('2d');
    this._wrapper.append(this._canvas);

    // on click
    this._canvas.addEventListener('click', (event: MouseEvent) =>
      this.onClick(event.offsetX, event.offsetY)
    );

    // on mouse
    this._canvas.addEventListener('mousedown', (event: MouseEvent) =>
      this.onMouse(true, event.offsetX, event.offsetY)
    );
    this._canvas.addEventListener('mouseup', (event: MouseEvent) =>
      this.onMouse(false, event.offsetX, event.offsetY)
    );
    this._canvas.addEventListener('mouseleave', (event: MouseEvent) =>
      this.onMouse(false, event.offsetX, event.offsetY)
    );
    this._canvas.addEventListener('mousemove', (event: MouseEvent) =>
      this.onMouseMove(event.offsetX, event.offsetY)
    );

    // on wheel
    this._canvas.addEventListener('wheel', (event: WheelEvent) => this.onScroll(event.deltaY > 0));

    // on resize
    window.addEventListener('resize', (event: UIEvent) => this.sizeCanvas());
  }

  public init(): void {
    this.sizeCanvas();
  }

  private sizeCanvas(): void {
    this._size = Math.floor(this._wrapper.offsetWidth);
    this._unitSize = this._size / this._unitsPerLine;
    this._render.canvas.width = this._size;
    this._render.canvas.height = this._size;
    this.onResize();
  }

  public get size(): number {
    return this._size;
  }
  public get unitSize(): number {
    return this._unitSize;
  }
  public get render(): CanvasRenderingContext2D {
    return this._render;
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
