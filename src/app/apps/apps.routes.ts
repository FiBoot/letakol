import { AppsComponent } from './apps.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { CodewarComponent } from './codewar/codewar.component';
import { PetComponent } from './pet/pet.component';
import { MemoryComponent } from './memory/memory.component';
import { ChatComponent } from './chat/chat.component';
import { SnakeIoComponent } from './snake-io/snake-io.component';
import { Routes } from '@angular/router';

export const APPS_ROUTES: Routes = [
  {
    path: 'apps',
    component: AppsComponent,
    children: [
      { path: 'chat', component: ChatComponent },
      { path: 'codewar', component: CodewarComponent },
      { path: 'keyboard', component: KeyboardComponent },
      { path: 'memory', component: MemoryComponent },
      { path: 'pet', component: PetComponent },
      { path: 'snake', component: SnakeIoComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];
