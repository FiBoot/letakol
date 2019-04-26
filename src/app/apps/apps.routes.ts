import { AppsComponent } from './apps.component';
import { ChatComponent } from './chat/chat.component';
import { CodewarComponent } from './codewar/codewar.component';
import { GolComponent } from './gol/gol.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { MemoryComponent } from './memory/memory.component';
import { PetComponent } from './pet/pet.component';
import { SmwComponent } from './smw/smw.component';
import { SnakeIoComponent } from './snake-io/snake-io.component';
import { Routes } from '@angular/router';

export const APPS_ROUTES: Routes = [
  {
    path: 'apps',
    component: AppsComponent,
    children: [
      { path: 'chat', component: ChatComponent },
      { path: 'codewar', component: CodewarComponent },
      { path: 'gol', component: GolComponent },
      { path: 'keyboard', component: KeyboardComponent },
      { path: 'memory', component: MemoryComponent },
      { path: 'pet', component: PetComponent },
      { path: 'smw', component: SmwComponent },
      { path: 'snake', component: SnakeIoComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];
