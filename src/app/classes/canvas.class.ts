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
      this.onClick(
        Math.floor(event.offsetX / this._unitSize),
        Math.floor(event.offsetY / this._unitSize)
      )
    );

    // on resize
    window.addEventListener('resize', (event: UIEvent) => this.sizeCanvas());
    this.sizeCanvas();
  }

  private sizeCanvas(): void {
    if (this._wrapper.offsetWidth !== this._size) {
      this._size = this._wrapper.offsetWidth;
      this._unitSize = this._size / this._unitsPerLine;
      this._canvas.style.width = `${this._size}px`;
      this._canvas.style.height = `${this._size}px`;
      this.onResize();
    }
  }

  protected onResize(): void {}
  protected onClick(x: number, y: number): void {}

  public get size(): number {
    return this._size;
  }
  public get render(): CanvasRenderingContext2D {
    return this._render;
  }
}
