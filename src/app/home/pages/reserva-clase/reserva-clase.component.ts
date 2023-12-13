import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin/services/admin.service';
import { Clase } from 'src/app/admin/interfaces/clase.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserva-clase',
  templateUrl: './reserva-clase.component.html',
  styleUrl: './reserva-clase.component.css'
})
export class ReservaClaseComponent implements OnInit {

  clases!: Clase[];

  clasesSeleccionadas?: string[];

  selectedClaseId?: string;

  constructor(
    private readonly adminService: AdminService,
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
    private readonly router: Router,

  ) {}


  ngOnInit(): void {
    this.adminService.doGet<Clase[]>('/clase', { responseType: 'json'} )
      .subscribe({
        next: (value) => {
          this.clases = value;
          // this.router.navigateByUrl('/home/reserva-clase');
        },
        error: (message) => console.log(message)
      });

      this.clasesSeleccionadas = this.authService.currentUser()?.clasesReservadas || [];

  }

  onSelectClase( id?: string ) {

    if( !id ) return;

    if (this.clasesSeleccionadas?.includes(id)) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ya tiene reservada la Clase' });
      return;
    }

    this.clasesSeleccionadas?.push(id);
    this.selectedClaseId  = id;


    this.adminService.doPatch('/usuario', this.authService.currentUser()!._id, { clasesReservadas: this.clasesSeleccionadas }, { responseType: 'json'} )
      .subscribe({
        next: () => this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Clase reservada con exito' }),
        error: (value) => this.messageService.add({ severity: 'error', summary: 'Error', detail: value.error.message }),
      })
  }

 // Método para verificar si una clase está seleccionada
 isClaseSelected(id?: string): boolean {
  return !!id && !!this.clasesSeleccionadas?.includes(id);
}

}
