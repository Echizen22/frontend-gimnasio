import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Usuario } from '../../interfaces/usuarios';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  usuarios!: Usuario[];

  statuses!: any[];

  loading: boolean = true;

  // activityValues: number[] = [0, 100];


  constructor(
    private readonly adminService: AdminService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,

  ) {}

  ngOnInit() {

   this.refresh();

  }

  getFormatFecha(fecha: Date) {
    if ( !fecha) return '';

    const date = new Date(fecha);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;

  }



  // Método para eliminar un usuario
  onDelete(id: string) {
    this.confirmationService.confirm({
      message: 'Esta seguro que quiere eliminar el usuario?',
      header: 'Confirmación de eliminarción',
      icon: 'pi pi-info-circle',
      accept: () => {
        console.log(id);
        this.adminService.doDelete(`/usuario/${ id }`, { responseType: 'json' })
          .subscribe({
            next: () => {
              this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Eliminado con exito' });
              this.refresh()
            },
            error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido eliminar' })
          });

      },
      reject: (type: ConfirmEventType ) => {
        switch ( type ) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Has rechazado la eliminación' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'Haz cancelado la eliminación' });
            break;
        }
      }
    });
  }


  // Refresca la pagina
  refresh() {
    this.adminService.doGet<Usuario[]>('/usuario', { responseType: 'json' })
    .subscribe({
      next: (valor) => {

        this.usuarios = valor;
        this.loading = false;
        this.usuarios.forEach((usuario) => {
          usuario.fechaNacimiento = this.getFormatFecha(new Date(<Date>usuario.fechaNacimiento));
          usuario.fechaIni = this.getFormatFecha(new Date(<Date>usuario.fechaIni));
          usuario.estado === 'A' ? usuario.estado = true: usuario.estado = false;

          if( usuario.fechaFin != null ) {
            usuario.fechaFin = this.getFormatFecha(new Date(<Date>usuario.fechaFin));
          }

        })
      },
      error: () =>{
        console.log('Error');
      }
    });


  }



}
