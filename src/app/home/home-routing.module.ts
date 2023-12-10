import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { InicioPageComponent } from './pages/inicio-page/inicio-page.component';
import { PorQueMyGymComponent } from './pages/por-que-my-gym/por-que-my-gym.component';
import { UbicacionComponent } from './pages/ubicacion/ubicacion.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'inicio', loadChildren: () => import('./pages/inicio-page/inicio-page.module').then( m => m.InicioPageModule )},
      { path: 'por-que-my-gym', component: PorQueMyGymComponent },
      { path: 'ubicacion', component: UbicacionComponent },
      { path: 'perfil', loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilModule )},
      { path: 'actualizar-perfil/:id', loadChildren: () => import('./pages/actualizar-perfil/actualizar-perfil.module').then( m => m.ActualizarPerfilModule )},
      { path: '**', redirectTo: 'inicio' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
