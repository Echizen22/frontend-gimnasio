import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutPageComponent } from './pages/admin-layout-page/admin-layout-page.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
const routes: Routes = [
  {
    path: '', component: AdminLayoutPageComponent,
    children: [
      { path: 'welcome', component: WelcomeComponent},

      // Usuarios
      { path: 'usuario', loadChildren: () => import('./pages/usuario/usuario.module').then( m => m.UsuarioModule ) },
      { path: 'usuario/:id', loadChildren: () => import('./pages/usuario/usuario.module').then( m => m.UsuarioModule ) },
      { path: 'usuarios', loadChildren: () => import('./pages/usuarios/usuarios.module').then( m => m.UsuariosModule ) },

      // Promocion
      { path: 'promocion', loadChildren: () => import('./pages/promocion/promocion.module').then( m => m.PromocionModule )},
      { path: 'promocion/:id', loadChildren: () => import('./pages/promocion/promocion.module').then( m => m.PromocionModule )},
      { path: 'promociones', loadChildren: () => import('./pages/promociones/promociones.module').then( m => m.PromocionesModule )},

      // Plan
      { path: 'plan', loadChildren: () => import('./pages/plan/plan.module').then( m => m.PlanModule )},
      { path: 'plan/:id', loadChildren: () => import('./pages/plan/plan.module').then( m => m.PlanModule )},
      { path: 'planes', loadChildren: () => import('./pages/planes/planes.module').then( m => m.PlanesModule )},

      // Clase
      { path: 'clase', loadChildren: () => import('./pages/clase/clase.module').then( m => m.ClaseModule )},
      { path: 'clase/:id', loadChildren: () => import('./pages/clase/clase.module').then( m => m.ClaseModule )},
      { path: 'clases', loadChildren: () => import('./pages/clases/clases.module').then( m => m.ClasesModule )},

      { path: '**', redirectTo: 'welcome' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
