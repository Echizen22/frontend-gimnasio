import { Component, OnInit } from '@angular/core';
import { Promocion } from '../../interfaces/promocion';
import { AdminService } from '../../services/admin.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrl: './promociones.component.css'
})
export class PromocionesComponent implements OnInit {

  promociones!: Promocion[];

  statuses!: any[];

  loading: boolean = true;

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

  // Refresca la pagina
  refresh() {
    this.adminService.doGet<Promocion[]>('/promocion', { responseType: 'json' })
    .subscribe({
      next: (valor) => {

        this.promociones = valor;
        this.loading = false;
        this.promociones.forEach((promocion) => {

          promocion.fechaIni = this.getFormatFecha(new Date(<Date>promocion.fechaIni));
          promocion.fechaFin = this.getFormatFecha(new Date(<Date>promocion.fechaFin));

        })
      },
      error: () =>{
        console.log('Error');
      }
    });


  }

  // Método para eliminar una promocion
  onDelete(id: string) {
    this.confirmationService.confirm({
      message: 'Esta seguro que quiere eliminar la promoción?',
      header: 'Confirmación de eliminación',
      icon: 'pi pi-info-circle',
      accept: () => {
        console.log(id);
        this.adminService.doDelete(`/promocion/${ id }`, { responseType: 'json' })
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

}
