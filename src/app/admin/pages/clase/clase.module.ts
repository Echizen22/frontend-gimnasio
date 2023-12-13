import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaseRoutingModule } from './clase-routing.module';
import { ClaseComponent } from './clase.component';
import { PrimeNgModule } from 'src/app/shared/prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClaseComponent
  ],
  imports: [
    CommonModule,
    ClaseRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule
  ]
})
export class ClaseModule { }
