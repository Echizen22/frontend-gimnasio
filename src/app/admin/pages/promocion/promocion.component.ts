import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorsService } from 'src/app/shared/validators/Validators.service';
import { MessageService } from 'primeng/api';
import { Promocion } from '../../interfaces/promocion';

@Component({
  selector: 'app-promocion',
  templateUrl: './promocion.component.html',
  styleUrl: './promocion.component.css'
})
export class PromocionComponent implements OnInit {

  myForm!: UntypedFormGroup;

  // Parámetro de url
  id = '';

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly adminService: AdminService,
    private readonly router: Router,
    private readonly validatorsService: ValidatorsService,
    private readonly messageService: MessageService,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.myForm = this.fb.group({
      codigo: [, [ Validators.required ] ],
      nombre: [, [ Validators.required ]],
      urlImagen: [],
      descuento: [],
      fechaIni: [],
      fechaFin: []
    });

    this.id = this.route.snapshot.paramMap.get('id')!;

    this.refresh();

  }

  doSubmit() {

    // Solo si el formulario esta validado
    if(this.myForm.valid) {

      console.log(this.myForm.value);


      const newPromocion: Promocion = {
        codigo: this.myForm.value.codigo,
        nombre: this.myForm.value.nombre,
        urlImagen: this.myForm.value.urlImagen,
        descuento: this.myForm.value.descuento,
        fechaIni: this.myForm.value.fechaIni,
        fechaFin: this.myForm.value.fechaFin
      };



      if( !this.id ) {

        this.adminService.doPost<Promocion>('/promocion', newPromocion, { responseType: 'json'} )
        .subscribe({
          next: () => {

            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Promoción añadida con exito' });
            setTimeout(() => {
              this.router.navigateByUrl('/admin/promociones');
            }, 2000)

          },
          error: (value) => {
            console.log(value.error.message)
            this.messageService.add({ severity: 'error', summary: 'Error', detail: value.error.message })
          }
        });

      } else {

        this.adminService.doPatch<Promocion>('/promocion', this.id, newPromocion, { responseType: 'json' })
          .subscribe({
            next: () => {
              this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Promoción actualizada con exito' });
              this.router.navigate(['/admin/promocion/', this.id]);
              this.refresh()
            },
            error: (value) => {
              console.log(value.error.message)
              this.messageService.add({ severity: 'error', summary: 'Error', detail: value.error.message })
            }

          })

      }





    }

  }

  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.myForm, field );
  }

  private refresh() {
    if ( this.id ) {

      this.myForm.get('codigo')?.disable();

      // Recuperamos los datos del plan
      this.adminService.doGetWithId<Promocion>(`/promocion`, this.id, { responseType: 'json' })
        .subscribe({
          next: (valor) => {
            this.myForm.patchValue(valor);
            this.myForm.markAsPristine();
          },
          error: (valor) => {
            console.log(valor);
          }
        })

    }
  }

}
