import { Coord } from 'src/app/classes/coord.class';
import { Utils } from 'src/app/services/utils/utils.service';
import { Status } from './status.class';

export class Token {
  private _id: string = Utils.generateId();
  coord: Coord = new Coord(100, 200);
  selected: boolean = false;

  name: string = '';
  color: string = '#333';
  maxHp: number = 15;
  currentHp: number = 15;
  statusList: Status[] = new Array<Status>();

  public get id() {
    return this._id;
  }

  public addStatus(): void {
    this.statusList.push(new Status());
  }

  public removeStatus(status: Status): void {
    this.statusList.splice(this.statusList.indexOf(status), 1);
  }
}
