import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanesRoutingModule } from './planes-routing.module';
import { PlanesComponent } from './planes.component';
import { PrimeNgModule } from 'src/app/shared/prime-ng/prime-ng.module';


@NgModule({
  declarations: [
    PlanesComponent
  ],
  imports: [
    CommonModule,
    PlanesRoutingModule,
    PrimeNgModule
  ]
})
export class PlanesModule { }
