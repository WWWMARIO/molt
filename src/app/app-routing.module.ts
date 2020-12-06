import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './modules/core/welcome/welcome.component';

const routes: Routes = [{
  path: '',
  component: WelcomeComponent,
  pathMatch: 'full'
},
  { path: 'menu', loadChildren: () => import('./modules/menu/menu.module').then(m => m.MenuModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
