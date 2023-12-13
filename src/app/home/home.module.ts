import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { InicioPageComponent } from './pages/inicio-page/inicio-page.component';
import { PorQueMyGymComponent } from './pages/por-que-my-gym/por-que-my-gym.component';
import { UbicacionComponent } from './pages/ubicacion/ubicacion.component';
import { PrimeNgModule } from '../shared/prime-ng/prime-ng.module';
import { AuthService } from '../auth/services/auth.service';
import { AuthModule } from '../auth/auth.module';
import { ReservaClaseComponent } from './pages/reserva-clase/reserva-clase.component';
import { MessageService } from 'primeng/api';



@NgModule({
  declarations: [
    LayoutPageComponent,
    InicioPageComponent,
    PorQueMyGymComponent,
    UbicacionComponent,
    ReservaClaseComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PrimeNgModule,
    AuthModule
  ],
  providers: [ MessageService ]
})
export class HomeModule { }
