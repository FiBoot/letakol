import { ComponentsModule } from './../components/components.module';
import { AppsComponent } from './apps.component';
import { APPS_ROUTES } from './apps.routes';
import { ArchitectsLogoComponent } from './architects-logo/architects-logo.component';
import { CardProbaComponent } from './card-proba/card-proba.component';
import { ChatComponent } from './chat/chat.component';
import { CodewarComponent } from './codewar/codewar.component';
import { GolComponent } from './gol/gol.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { MemoryComponent } from './memory/memory.component';
import { MhwApiComponent } from './mhw-api/mhw-api.component';
import { OrbsComponent } from './orbs/orbs.component';
import { PetComponent } from './pet/pet.component';
import { SmwComponent } from './smw/smw.component';
import { SnakeIoComponent } from './snake-io/snake-io.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CodemirrorModule } from 'ng2-codemirror';
import { Ng5SliderModule } from 'ng5-slider';

@NgModule({
  declarations: [
    AppsComponent,
    ArchitectsLogoComponent,
    ChatComponent,
    CodewarComponent,
    GolComponent,
    KeyboardComponent,
    MemoryComponent,
    PetComponent,
    SnakeIoComponent,
    SmwComponent,
    OrbsComponent,
    CardProbaComponent,
    MhwApiComponent
  ],
  imports: [
    RouterModule.forChild(APPS_ROUTES),
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    CodemirrorModule,
    Ng5SliderModule,
    ComponentsModule
  ]
})
export class AppsModule {}

export function loadAppsRouteModule() {
  return AppsModule;
}
