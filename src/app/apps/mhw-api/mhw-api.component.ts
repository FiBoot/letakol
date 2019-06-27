import { MHWDataType } from './models/mhw.enum';
import { MHWBase, MHWBaseType } from './models/mhw.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Mutex } from 'src/app/classes/mutex.class';

const MHW_API = 'https://mhw-db.com';

enum filterKey {
  SELECT,
  TEXT
}

@Component({
  selector: 'app-mhw-api',
  templateUrl: './mhw-api.component.html',
  styleUrls: ['./mhw-api.component.css']
})
export class MhwApiComponent implements OnInit {
  public mutex = new Mutex(false);

  readonly types = Object.keys(MHWDataType).map(key => MHWDataType[key]); // for type select
  readonly oTypes = Object.assign({}, MHWDataType); // for items templates

  private items: Array<MHWBaseType>;
  private filters: Array<(item: MHWBaseType) => boolean>;
  public displayedItems: Array<MHWBaseType>;
  public paginatedItems: Array<MHWBaseType>;
  public viewed: MHWBaseType;

  constructor(private http: HttpClient) {
    this.filters = [null, null];
  }

  ngOnInit(): void {
    this.loadData();
  }

  // fuck you mhw api
  private specialKey(key: string): string {
    return key === MHWDataType.ARMOR ? key : `${key}s`;
  }

  private loadMHWData(): Promise<MHWBaseType> {
    return Promise.all(
      this.types.map(key =>
        this.http
          .get(`${MHW_API}/${this.specialKey(key)}`)
          .toPromise()
          .then((result: Array<MHWBase>) => {
            console.log(`${key}s loaded`);
            return result.map(data => ({
              base: data,
              parsed: JSON.stringify(data).toLocaleLowerCase(),
              type: key
            }));
          })
      )
    ).then(data => [].concat.apply([], data));
  }

  private async loadData() {
    this.items = await this.mutex.exec(this.loadMHWData.bind(this));
    this.filterDisplayedData();
  }

  private filterDisplayedData(): void {
    let items = this.items;
    if (this.filters[filterKey.SELECT]) {
      items = items.filter(this.filters[filterKey.SELECT]);
    }
    if (this.filters[filterKey.TEXT]) {
      items = items.filter(this.filters[filterKey.TEXT]);
    }
    this.displayedItems = items;
  }

  public selectType(type: MHWDataType | '*'): void {
    this.filters[filterKey.SELECT] = type !== '*' ? item => item.type === type : null;
    this.filterDisplayedData();
  }

  public onSearchKey(search: string): void {
    search = search.toLocaleLowerCase();
    this.filters[filterKey.TEXT] = search ? item => item.parsed.search(search) >= 0 : null;
    this.filterDisplayedData();
  }

  public selectItem(item: MHWBaseType): void {
    this.viewed = item;
  }

  public equip(item: MHWBaseType): void {
    console.log(item.base);
  }
}
