import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppList, IApp } from 'src/app/apps/app-list';


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent {

  public search: string;
  private appList: Array<IApp> = AppList;
  public apps: Array<IApp>;

  constructor(private router: Router) {
    this.filterApp();
  }

  public filterApp(search: string = null): void {
    this.apps = search
      ? this.appList.filter(app => app.name.toLowerCase().search(search.toLowerCase()) !== -1)
      : this.appList;
  }

  public resetSearch(): void {
    this.filterApp(this.search = null);
  }

  public nav(app: IApp): void {
    this.router.navigate([`/${app.path}`]);
  }
}
