import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActualizarPerfilRoutingModule } from './actualizar-perfil-routing.module';
import { ActualizarPerfilComponent } from './actualizar-perfil.component';
import { PrimeNgModule } from 'src/app/shared/prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ActualizarPerfilComponent
  ],
  imports: [
    CommonModule,
    ActualizarPerfilRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
  ]
})
export class ActualizarPerfilModule { }
