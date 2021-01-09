import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
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
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/orders/orders.module').then((m) => m.OrdersModule),
      },
      {
        path: 'menu',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/menu/menu.module').then((m) => m.MenuModule),
      },
      {
        path: 'users',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'categories',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      },
      { path: 'messages', canActivate: [AuthGuard], loadChildren: () => import('./modules/messages/messages.module').then(m => m.MessagesModule) },
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
