import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { PrimeNgModule } from '../shared/prime-ng/prime-ng.module';
import { AdminLayoutPageComponent } from './pages/admin-layout-page/admin-layout-page.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { DateTimeFormatPipe } from './pipes/unix-to-dateTime.pipe';
import { DateFormatPipe } from './pipes/unix-to-date.pipe';
import { AdminService } from './services/admin.service';
import { ConfirmationService, MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    AdminLayoutPageComponent,
    WelcomeComponent,
    DateTimeFormatPipe,
    DateFormatPipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ DateFormatPipe ],
  providers: [ AdminService, ConfirmationService, MessageService]
})
export class AdminModule { }
