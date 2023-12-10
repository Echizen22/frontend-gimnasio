import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Usuario } from 'src/app/admin/interfaces/usuarios';
import { AdminService } from 'src/app/admin/services/admin.service';
import { User } from 'src/app/auth/interfaces';
import { ValidatorsService } from 'src/app/shared/validators/Validators.service';
import { ActualizarPerfil } from '../../interfaces/actualizarPerfil';

@Component({
  selector: 'app-actualizar-perfil',
  templateUrl: './actualizar-perfil.component.html',
  styleUrl: './actualizar-perfil.component.css'
})
export class ActualizarPerfilComponent implements OnInit {

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
      direccion: [, [ Validators.required ]],
      correo: [, [ Validators.required ]],
      repetirCorreo: [, [ Validators.required ]],
      telefono: [, [ Validators.required ]],
    },{
        validators: [
          this.validatorsService.isFieldOneEqualFieldTwo('correo', 'repetirCorreo')
        ]
    });

    this.id = this.route.snapshot.paramMap.get('id')!;

    this.refresh();
  }

  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.myForm, field );
  }


  doSubmit() {


    if(this.myForm.valid) {

      const actualizarPerfil: ActualizarPerfil = {
        telefono: this.myForm.value.telefono,
        correo: this.myForm.value.correo,
        repetirCorreo: this.myForm.value.repetirCorreo,
        direccion: this.myForm.value.direccion,
      };


      this.adminService.doPatch<Usuario>('/usuario', this.id, actualizarPerfil, { responseType: 'json' })
          .subscribe({
            next: () => {
              this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Perfil de usuario actualizado con exito' });
              setTimeout(() => this.router.navigate(['/home/perfil']), 2000);

            },
            error: (value) => {
              console.log(value.error.message)
              this.messageService.add({ severity: 'error', summary: 'Error', detail: value.error.message })
            }

          })

    }



  }

  private refresh() {
    if ( this.id ) {

      // Recuperamos los datos del plan
      this.adminService.doGetWithId<Usuario>(`/usuario`, this.id, { responseType: 'json' })
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
