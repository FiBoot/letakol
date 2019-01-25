export interface IApp {
  name: string;
  description: string;
  path: string;
}

class App {
  constructor(readonly path: string, readonly name: string, readonly description: string = '') { }
}

export const AppList: Array<IApp> = [
  new App('images', 'Images'),
  new App('codewar', 'CODEWAR', 'Pas comme le corewar mais en JS'),
  new App('snake', 'Snake', '<::::::::::::::::c'),
  new App('chat', 'Chat'),
  new App('chat-room', 'Chat room'),
  new App('memory', 'memory'),
  new App('list/users', 'User list'),
];
