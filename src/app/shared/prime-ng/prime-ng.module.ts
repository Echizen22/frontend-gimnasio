import { NgModule } from '@angular/core';

import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';




@NgModule({
  exports: [
    MenubarModule,
    ButtonModule,
    CardModule,
    CarouselModule
  ]
})
export class PrimeNgModule { }
