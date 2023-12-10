import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromocionesRoutingModule } from './promociones-routing.module';
import { PromocionesComponent } from './promociones.component';
import { PrimeNgModule } from 'src/app/shared/prime-ng/prime-ng.module';


@NgModule({
  declarations: [
    PromocionesComponent
  ],
  imports: [
    CommonModule,
    PromocionesRoutingModule,
    PrimeNgModule
  ]
})
export class PromocionesModule { }
