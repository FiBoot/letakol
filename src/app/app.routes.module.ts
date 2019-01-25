import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultComponent } from './views/default/default.component';
import { UserViewComponent } from './views/user-view/user-view.component';
import { ListViewComponent } from './views/list-view/list-view.component';

import { MemoryComponent } from './apps/memory/memory.component';
import { ChatComponent } from './apps/chat/chat.component';
import { ChatRoomComponent } from './apps/chat-room/chat-room.component';
import { NumGridComponent } from './apps/num-grid/num-grid.component';
import { SnakeIoComponent } from './apps/snake-io/snake-io.component';
import { UserEditComponent } from './views/user-edit/user-edit.component';
import { PetComponent } from './apps/pet/pet.component';
import { CodewarComponent } from './apps/codewar/codewar.component';
import { AdminComponent } from './views/admin/admin.component';
import { ImagesComponent } from './views/images/images.component';

const routes: Routes = [
  { path: '', component: DefaultComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'user', component: UserViewComponent },
  { path: 'user/:id', component: UserViewComponent },
  { path: 'user-edit', component: UserEditComponent },
  { path: 'list/:item', component: ListViewComponent },

  { path: 'images', component: ImagesComponent },
  { path: 'image/:id', component: ImagesComponent },

  // APPS
  { path: 'codewar', component: CodewarComponent },
  { path: 'pet', component: PetComponent },
  { path: 'memory', component: MemoryComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'chat-room', component: ChatRoomComponent },
  { path: 'num-grid', component: NumGridComponent },
  { path: 'snake', component: SnakeIoComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
