import { Component, OnInit } from '@angular/core';
import { Clase } from '../../interfaces/clase.interface';
import { AdminService } from '../../services/admin.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrl: './clases.component.css'
})
export class ClasesComponent implements OnInit  {


  clases!: Clase[];

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


  // Refresca la pagina
  refresh() {
    this.adminService.doGet<Clase[]>('/clase', { responseType: 'json' })
    .subscribe({
      next: (valor) => {

        this.clases = valor;
        this.loading = false;
      },
      error: () =>{
        console.log('Error');
      }
    });


  }

  // Método para eliminar un clase
  onDelete(id: string) {
    this.confirmationService.confirm({
      message: 'Esta seguro que quiere eliminar la clase?',
      header: 'Confirmación de eliminación',
      icon: 'pi pi-info-circle',
      accept: () => {
        console.log(id);
        this.adminService.doDelete(`/clase/${ id }`, { responseType: 'json' })
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
