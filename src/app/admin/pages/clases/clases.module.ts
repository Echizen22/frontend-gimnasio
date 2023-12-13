import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClasesRoutingModule } from './clases-routing.module';
import { ClasesComponent } from './clases.component';
import { PrimeNgModule } from 'src/app/shared/prime-ng/prime-ng.module';


@NgModule({
  declarations: [
    ClasesComponent
  ],
  imports: [
    CommonModule,
    ClasesRoutingModule,
    PrimeNgModule
  ]
})
export class ClasesModule { }
