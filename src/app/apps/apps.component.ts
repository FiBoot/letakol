import { Utils } from 'src/app/services/utils/utils.service';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

class App {
  constructor(
    readonly path: string,
    readonly name: string,
    readonly description: string = ''
  ) {}
}

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.css']
})
export class AppsComponent {
  apps: Array<App>;
  currentApp: string;

  constructor(activatedRoute: ActivatedRoute) {
    activatedRoute.url.subscribe(url => {
      const path = Utils.first(activatedRoute.snapshot.children).routeConfig.path;
      this.currentApp = path !== '**' ? path : null;
    });

    this.apps = [
      new App('chat', 'Chat'),
      new App('codewar', 'CODEWAR', 'Pas comme le corewar mais en JS'),
      new App('keyboard', 'Keyboard'),
      new App('memory', 'Memory game (turtle)', 'c::::::::::::::::<'),
      new App('pet', 'Pet test'),
      new App('snake', 'Snake', 'c::::::::::::::::<')
    ];
  }
}
