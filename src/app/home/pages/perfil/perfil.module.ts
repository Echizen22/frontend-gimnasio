import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil.component';
import { PrimeNgModule } from 'src/app/shared/prime-ng/prime-ng.module';
import { AdminModule } from 'src/app/admin/admin.module';


@NgModule({
  declarations: [
    PerfilComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    PrimeNgModule,
    AdminModule
  ]
})
export class PerfilModule { }
