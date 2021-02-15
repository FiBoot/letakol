import { AppsComponent } from './apps.component';
import { ArchitectsLogoComponent } from './architects-logo/architects-logo.component';
import { ChatComponent } from './chat/chat.component';
import { CodewarComponent } from './codewar/codewar.component';
import { GolComponent } from './gol/gol.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { SnakeIoComponent } from './snake-io/snake-io.component';
import { Routes } from '@angular/router';
import { VoidStonesComponent } from './void-stones/void-stones.component';

export const APPS_ROUTES: Routes = [
  {
    path: 'apps',
    component: AppsComponent,
    children: [
      { path: 'void-stones', component: VoidStonesComponent },
      { path: 'architects-logo', component: ArchitectsLogoComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'codewar', component: CodewarComponent },
      { path: 'gol', component: GolComponent },
      { path: 'keyboard', component: KeyboardComponent },
      { path: 'snake', component: SnakeIoComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];
