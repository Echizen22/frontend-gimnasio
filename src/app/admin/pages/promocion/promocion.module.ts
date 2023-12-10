import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromocionRoutingModule } from './promocion-routing.module';
import { PrimeNgModule } from 'src/app/shared/prime-ng/prime-ng.module';
import { PromocionComponent } from './promocion.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PromocionComponent
  ],
  imports: [
    CommonModule,
    PromocionRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule
  ]
})
export class PromocionModule { }
