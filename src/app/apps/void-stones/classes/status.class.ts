export class Status {
  public name: string = '';
  public effect: string = '';
  public turn: number = 1;
  public decrease: boolean = true;

  public next(): void {
    this.turn += this.decrease ? -1 : 1;
  }
}
