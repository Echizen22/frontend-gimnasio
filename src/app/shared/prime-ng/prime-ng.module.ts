import { NgModule } from '@angular/core';

import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { MessagesModule } from 'primeng/messages';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';

import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';





@NgModule({
  exports: [


    MenubarModule,
    ButtonModule,
    CardModule,
    CarouselModule,
    InputTextModule,
    InputNumberModule,
    PasswordModule,
    CalendarModule,
    InputMaskModule,
    MessagesModule,
    SidebarModule,
    TableModule,
    MultiSelectModule,
    DropdownModule,
    TagModule,
    ToastModule,
    ConfirmDialogModule,
    CheckboxModule,
    InputSwitchModule

  ]
})
export class PrimeNgModule { }
