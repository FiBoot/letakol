import { AppsComponent } from './apps.component';
import { ArchitectsLogoComponent } from './architects-logo/architects-logo.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { SnakeIoComponent } from './snake-io/snake-io.component';
import { Routes } from '@angular/router';
import { VoidStonesComponent } from './void-stones/void-stones.component';
import { PixelWarComponent } from './pixel-war/pixel-war.component';

export const APPS_ROUTES: Routes = [
	{
		path: 'apps',
		component: AppsComponent,
		children: [
			{ path: 'void-stones', component: VoidStonesComponent },
			{ path: 'architects-logo', component: ArchitectsLogoComponent },
			{ path: 'pixels', component: PixelWarComponent },
			{ path: 'keyboard', component: KeyboardComponent },
			{ path: 'snake', component: SnakeIoComponent },
			{ path: '**', redirectTo: '' },
		],
	},
];
