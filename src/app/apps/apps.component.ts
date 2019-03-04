import { Component } from '@angular/core';

class App {
  constructor(readonly path: string, readonly name: string, readonly description: string = '') { }
}

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.css']
})
export class AppsComponent  {

  constructor() {

    const AppList: Array<App> = [
      new App('images', 'Images'),
      new App('codewar', 'CODEWAR', 'Pas comme le corewar mais en JS'),
      new App('snake', 'Snake', '<::::::::::::::::c'),
      new App('chat', 'Chat'),
      new App('chat-room', 'Chat room'),
      new App('memory', 'memory'),
      new App('list/users', 'User list'),
    ];
  }

}
