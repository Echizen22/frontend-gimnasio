import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorsService } from 'src/app/shared/validators/Validators.service';
import { MessageService } from 'primeng/api';
import { Clase } from '../../interfaces/clase.interface';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styleUrl: './clase.component.css'
})
export class ClaseComponent implements OnInit {

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
      nombre: [, [ Validators.required ]],
      descripcion: [],
      horario: [, [ Validators.required ]],
      duracion: [, [ Validators.required ]],
      instructor: [],
      nivelDificultad: [, [ Validators.required ]]
    });

    this.id = this.route.snapshot.paramMap.get('id')!;

    this.refresh();

  }

  doSubmit() {

    console.log(this.myForm.value);
    // Solo si el formulario esta validado
    if(this.myForm.valid) {


      const newClase: Clase = {
        nombre: this.myForm.value.nombre,
        descripcion: this.myForm.value.descripcion,
        horario: this.myForm.value.horario,
        duracion: this.myForm.value.duracion,
        instructor: this.myForm.value.instructor,
        nivelDificultad: this.myForm.value.nivelDificultad.nombre
      };



      if( !this.id ) {

        this.adminService.doPost<Clase>('/clase', newClase, { responseType: 'json'} )
        .subscribe({
          next: () => {

            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Clase añadida con exito' });
            setTimeout(() => {
              this.router.navigateByUrl('/admin/clases');
            }, 2000)

          },
          error: (value) => {
            console.log(value.error.message)
            this.messageService.add({ severity: 'error', summary: 'Error', detail: value.error.message })
          }
        });

      } else {

        this.adminService.doPatch<Clase>('/clase', this.id, newClase, { responseType: 'json' })
          .subscribe({
            next: () => {
              this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Clase actualizada con exito' });
              this.router.navigate(['/admin/clase/', this.id]);
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

      // Recuperamos los datos del clase
      this.adminService.doGetWithId<Clase>(`/clase`, this.id, { responseType: 'json' })
        .subscribe({
          next: (valor) => {
            this.myForm.patchValue(valor);
            this.myForm.patchValue({ nivelDificultad: { nombre: valor.nivelDificultad } });
            this.myForm.markAsPristine();
          },
          error: (valor) => {
            console.log(valor);
          }
        })

    }
  }


}
