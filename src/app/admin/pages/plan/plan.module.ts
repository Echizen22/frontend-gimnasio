import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanRoutingModule } from './plan-routing.module';
import { PrimeNgModule } from 'src/app/shared/prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PlanComponent } from './plan.component';


@NgModule({
  declarations: [
    PlanComponent
  ],
  imports: [
    CommonModule,
    PlanRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
  ]
})
export class PlanModule { }
