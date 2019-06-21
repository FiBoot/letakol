import { MHWDataType } from './models/mhw.enum';
import { MHWBase, MHWDataModel, MHWIdNameType } from './models/mhw.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Mutex } from 'src/app/classes/mutex.class';

const MHW_API = 'https://mhw-db.com';

@Component({
  selector: 'app-mhw-api',
  templateUrl: './mhw-api.component.html',
  styleUrls: ['./mhw-api.component.css']
})
export class MhwApiComponent implements OnInit {
  readonly types = Object.keys(MHWDataType).map(key => MHWDataType[key]);
  public mutex = new Mutex(false);
  public datas: MHWDataModel;
  public items: Array<MHWBase>;

  public viewedItem: {
    item: MHWBase;
    type: MHWDataType;
  };

  constructor(private http: HttpClient) {
    this.datas = this.dataModel;
  }

  ngOnInit(): void {
    this.loadData();
  }

  private get dataModel(): MHWDataModel {
    return {
      armors: [],
      charms: [],
      decorations: [],
      items: [],
      skills: [],
      weapons: []
    };
  }

  private getType(type: string): MHWDataType {
    switch (type) {
      case 'armors':
        return MHWDataType.ARMOR;
      case 'charms':
        return MHWDataType.CHARM;
      case 'decorations':
        return MHWDataType.DECORATION;
      case 'items':
        return MHWDataType.ITEM;
      case 'skills':
        return MHWDataType.SKILL;
      case 'weapons':
        return MHWDataType.WEAPON;
      default:
        throw new Error(`MhwApiComponent getType: Unknow type: ${type}`);
    }
  }

  private newBase(item: MHWBase, type: string): MHWIdNameType {
    return { id: item.id, name: item.name, type: this.getType(type) };
  }

  // fuck you mhw api
  private specialKey(key: string): string {
    return key === 'armors' ? 'armor' : key;
  }

  private loadMHWData(): Promise<MHWDataModel> {
    return Promise.all(
      Object.keys(this.datas).map(key =>
        this.http.get(`${MHW_API}/${this.specialKey(key)}`).toPromise()
      )
    ).then(data => {
      const ret: MHWDataModel = this.dataModel;
      Object.keys(this.datas).forEach((key, index) => (ret[key] = data[index]));
      return ret;
    });
  }

  private async loadData() {
    this.datas = await this.mutex.exec(this.loadMHWData.bind(this));
    if (this.mutex.error) {
      return;
    }
    this.items = [].concat.apply(
      [],
      Object.keys(this.datas).map(key => this.datas[key].map(data => this.newBase(data, key)))
    );
    console.log(this.items);
  }

  public selectType(type: MHWDataType | '*'): void {
    console.warn(type);
  }

  public selectItem(item: MHWIdNameType): void {
    this.viewedItem = {
      item: this.datas[`${item.type}s`].find(i => i.id === item.id),
      type: item.type
    };
  }
}
