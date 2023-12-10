import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorsService } from 'src/app/shared/validators/Validators.service';
import { MessageService } from 'primeng/api';
import { Plan } from '../../interfaces/plan';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.css'
})
export class PlanComponent implements OnInit {

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
      precio: [, [ Validators.required ]],
      descripcion: [, [ Validators.required ]]
    });

    this.id = this.route.snapshot.paramMap.get('id')!;

    this.refresh();

  }

  doSubmit() {

    // Solo si el formulario esta validado
    if(this.myForm.valid) {


      const newPlan: Plan = {
        codigo: this.myForm.value.codigo,
        nombre: this.myForm.value.nombre,
        precio: this.myForm.value.precio,
        descripcion: this.myForm.value.descripcion
      };



      if( !this.id ) {

        this.adminService.doPost<Plan>('/plan', newPlan, { responseType: 'json'} )
        .subscribe({
          next: () => {

            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Plan añadido con exito' });
            setTimeout(() => {
              this.router.navigateByUrl('/admin/planes');
            }, 2000)

          },
          error: (value) => {
            console.log(value.error.message)
            this.messageService.add({ severity: 'error', summary: 'Error', detail: value.error.message })
          }
        });

      } else {

        this.adminService.doPatch<Plan>('/plan', this.id, newPlan, { responseType: 'json' })
          .subscribe({
            next: () => {
              this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Plan actualizado con exito' });
              this.router.navigate(['/admin/plan/', this.id]);
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
      this.adminService.doGetWithId<Plan>(`/plan`, this.id, { responseType: 'json' })
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
