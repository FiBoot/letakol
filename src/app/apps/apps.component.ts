import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from 'src/app/services/utils/utils.service';

class App {
  constructor(readonly path: string, readonly name: string, readonly description: string = '') {}
}

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.css']
})
export class AppsComponent {
  apps: Array<App>;
  currentApp: string;

  constructor(private _router: Router, activatedRoute: ActivatedRoute) {
    activatedRoute.url.subscribe(url => {
      const path = Utils.first(activatedRoute.snapshot.children).routeConfig.path;
      this.currentApp = path !== '**' ? path : null;
    });

    this.apps = [
      new App('void-stones', 'Void Stones RP', 'map for atrophag'),
      new App('architects-logo', 'Architects logo', 'BLEGH'),
      new App('keyboard', 'Keyboard', 'Viens tater'),
      new App('gol', 'Game of Life', ''),
      new App('codewar', 'CODEWAR', 'Pas comme le corewar mais en JS'),
      new App('chat', 'Chat'),
      new App('snake', 'Snake', 'c::::::::::::::::<'),
    ];
  }

  public click(app: App): void {
    this._router.navigate(['/', 'apps', app.path]);
  }
}
