import { ComponentsModule } from './../components/components.module';
import { AppsComponent } from './apps.component';
import { APPS_ROUTES } from './apps.routes';
import { ArchitectsLogoComponent } from './architects-logo/architects-logo.component';
import { ChatComponent } from './chat/chat.component';
import { CodewarComponent } from './codewar/codewar.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { SnakeIoComponent } from './snake-io/snake-io.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Ng5SliderModule } from 'ng5-slider';

@NgModule({
  declarations: [
    AppsComponent,
    ArchitectsLogoComponent,
    ChatComponent,
    CodewarComponent,
    KeyboardComponent,
    SnakeIoComponent,
  ],
  imports: [
    RouterModule.forChild(APPS_ROUTES),
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    Ng5SliderModule,
    ComponentsModule
  ]
})
export class AppsModule {}

export function loadAppsRouteModule() {
  return AppsModule;
}
