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
      new App('keyboard', 'Keyboard', 'Viens tater'),
      new App('orbs', 'Orbs', 'testing collisions'),
      new App('tiles', 'Tiles', ''),
      new App('card-proba', 'Card probability', 'lucky?'),
      new App('mhw-api', 'Monster Hunter World API', 'datas!'),
      new App('gol', 'Game of Life', ''),
      new App('smw', 'SMW', 'test'),
      new App('codewar', 'CODEWAR', 'Pas comme le corewar mais en JS'),
      new App('chat', 'Chat'),
      new App('snake', 'Snake', 'c::::::::::::::::<'),
      new App('memory', 'Memory game', 'Une tortue à atteint l\'océan'),
      new App('pet', 'Pet test')
    ];
  }

  public click(app: App): void {
    this._router.navigate(['/', 'apps', app.path]);
  }
}
