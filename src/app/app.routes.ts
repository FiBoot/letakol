import { Routes } from '@angular/router';

import { DefaultComponent } from './views/default/default.component';
import { UserViewComponent } from './views/user-view/user-view.component';
import { ListViewComponent } from './views/list-view/list-view.component';

import { UserEditComponent } from './views/user-edit/user-edit.component';
import { AdminComponent } from './views/admin/admin.component';
import { ImagesComponent } from './views/images/images.component';
import { TimelineComponent } from './views/timeline/timeline.component';
import { loadAppsRouteModule } from './apps/apps.modules';

export const ROUTES: Routes = [
  { path: '', component: DefaultComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'user', component: UserViewComponent },
  { path: 'user/:id', component: UserViewComponent },
  { path: 'user-edit', component: UserEditComponent },
  { path: 'list/:item', component: ListViewComponent },

  { path: 'images', component: ImagesComponent },
  { path: 'image/:id', component: ImagesComponent },
  { path: 'timeline', component: TimelineComponent },
  { path: 'timeline-event/:id', component: TimelineComponent },

  { path: 'apps', loadChildren: loadAppsRouteModule },

  { path: '**', redirectTo: '' }
];
