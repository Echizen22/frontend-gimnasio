import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { PrimeNgModule } from 'src/app/shared/prime-ng/prime-ng.module';
import { AdminModule } from '../../admin.module';


@NgModule({
  declarations: [
    UsuariosComponent,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    PrimeNgModule,
    AdminModule

  ],
})
export class UsuariosModule { }
