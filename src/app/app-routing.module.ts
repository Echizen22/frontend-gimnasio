import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard, isNotAuthenticated } from './auth/guards';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

const routes: Routes = [
  {
    path: 'auth',
    // canActivate: [ isNotAuthenticated ],
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  },
  {
    path:'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomeModule ),
  },
  {
    path: 'dashboard',
    // canActivate: [ isAuthenticatedGuard ],
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule ),
  },
  {
    path: 'admin',
    canActivate: [ isAuthenticatedGuard ],
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule ),
  },
  {
    path: '404',
    component: Error404PageComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
