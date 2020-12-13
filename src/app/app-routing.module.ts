import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './modules/core/page-not-found/page-not-found.component';
import { ShellComponent } from './modules/core/shell/shell.component';
import { WelcomeComponent } from './modules/core/welcome/welcome.component';

/* const routes: Routes = [{
  path: '',
  component: WelcomeComponent,
  pathMatch: 'full'
},
  { path: 'menu', loadChildren: () => import('./modules/menu/menu.module').then(m => m.MenuModule) }
]; */

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'orders',
        loadChildren: () =>
          import('./modules/orders/orders.module').then((m) => m.OrdersModule),
      },
      {
        path: 'menu',
        loadChildren: () =>
          import('./modules/menu/menu.module').then((m) => m.MenuModule),
      },
      {
        path: '',
        redirectTo: 'menu',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },

  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
