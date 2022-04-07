import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from 'src/app/services/utils/utils.service';

class App {
	constructor(readonly path: Array<string>, readonly name: string, readonly description: string = '') {}
}

class Game extends App {
	constructor(path: string, name: string, description: string = '') {
		super(['/', 'apps', path], name, description);
	}
}

class View extends App {
	constructor(path: string, name: string, description: string = '') {
		super(['/', path], name, description);
	}
}

@Component({
	selector: 'app-apps',
	templateUrl: './apps.component.html',
	styleUrls: ['./apps.component.css'],
})
export class AppsComponent {
	apps: Array<App>;
	currentApp: string;

	constructor(private _router: Router, activatedRoute: ActivatedRoute) {
		activatedRoute.url.subscribe((url) => {
			const path = Utils.first(activatedRoute.snapshot.children).routeConfig.path;
			this.currentApp = path !== '**' ? path : null;
		});

		this.apps = [
			new View('', 'Last entries'),
			new View('images', 'Gallerie'),
			new Game('pixel-war', 'Pixel War', 'Général'),
			// new Game('void-stones', 'Void Stones RP', 'map for atrophag'),
			new Game('architects-logo', 'Architects logo', 'BLEGH'),
			new Game('keyboard', 'Keyboard', 'musicaly'),
			// new Game('gol', 'Game of Life', ''),
			new Game('snake', 'Snake', '<_/_\\_/_\\_/_\\_/_\\_/_\\_/°C-<'),
		];
	}

	public click(app: App): void {
		this._router.navigate(app.path);
	}
}
