import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from 'ng2-codemirror';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from './../components/components.module';
import { AppsComponent } from './apps.component';
import { RouterModule } from '@angular/router';
import { PetComponent } from './pet/pet.component';
import { MemoryComponent } from './memory/memory.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { CodewarComponent } from './codewar/codewar.component';
import { ChatComponent } from './chat/chat.component';
import { NgModule } from '@angular/core';
import { SnakeIoComponent } from './snake-io/snake-io.component';
import { APPS_ROUTES } from './apps.routes';

@NgModule({
  declarations: [
    AppsComponent,
    ChatComponent,
    CodewarComponent,
    KeyboardComponent,
    MemoryComponent,
    PetComponent,
    SnakeIoComponent
  ],
  imports: [
    RouterModule.forChild(APPS_ROUTES),
    BrowserModule,
    FormsModule,
    CodemirrorModule,
    ComponentsModule
  ]
})
export class AppsModule {}
