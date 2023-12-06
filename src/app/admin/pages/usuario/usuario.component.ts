import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorsService } from 'src/app/shared/validators/Validators.service';
import { AdminService } from '../../services/admin.service';
import { Usuario } from '../../interfaces/usuarios';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit {

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
      dni: [, [ Validators.required, this.validatorsService.dniValidator() ] ],
      nombre: [],
      apellidos: [],
      password: [, [ Validators.required, Validators.minLength(6) ] ],
      fechaNacimiento: [],
      telefono: [],
      correo: [],
      repetirCorreo: [],
      direccion: [],
      fechaIni: [],
    },{
      validators: [
        this.validatorsService.isFieldOneEqualFieldTwo('correo', 'repetirCorreo')
      ]
    });

    this.id = this.route.snapshot.paramMap.get('id')!;

    this.refresh();

  }

  doSubmit() {

    // Solo si el formulario esta validado
    if(this.myForm.valid) {

      const newUser: Usuario = {
        dni: this.myForm.value.dni,
        nombre: this.myForm.value.nombre,
        apellidos: this.myForm.value.apellidos,
        password: this.myForm.value.password,
        fechaNacimiento: this.myForm.value.fechaNacimiento,
        telefono: this.myForm.value.telefono,
        correo: this.myForm.value.correo,
        repetirCorreo: this.myForm.value.repetirCorreo,
        direccion: this.myForm.value.direccion,
        estado: 'A',
        fechaIni: new Date(),
        superUsuario: false,
      };



      if( !this.id ) {

        this.adminService.doPost('/usuario', newUser, { responseType: 'json'} )
        .subscribe({
          next: () => {

            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Usuario añadido con exito' });
            setTimeout(() => {
              this.router.navigateByUrl('/admin/usuarios');
            }, 2000)

          },
          error: (value) => {
            console.log(value.error.message)
            this.messageService.add({ severity: 'error', summary: 'Error', detail: value.error.message })
          }
        });

      } else {

        const { password:_, ...rest} = newUser;

        // this.estado = this.myForm.value.estado === true ? 'A': 'B';
        rest.estado = this.myForm.value.estado === true ? 'A': 'B';

        this.adminService.doPatch<Usuario>('/usuario', this.id, rest, { responseType: 'json' })
          .subscribe({
            next: () => {
              this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Usuario actualizado con exito' });
              this.router.navigate(['/admin/usuario/', this.id]);
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

      this.myForm.get('dni')?.disable();

      this.myForm.addControl('estado', this.fb.control(''));
      this.myForm.removeControl('password');
      this.myForm.get('password')?.clearValidators();
      this.myForm.get('password')?.updateValueAndValidity();


      // Recuperamos los datos del usuario
      this.adminService.doGetWithId<Usuario>(`/usuario`, this.id, { responseType: 'json' })
        .subscribe({
          next: (valor) => {
            const { fechaNacimiento:fechaNac, fechaIni:fechaInicio, ...rest } = valor;

            const fechaNacimiento = new Date(fechaNac);
            const fechaIni = new Date(fechaInicio);

            rest.estado === 'A' ? rest.estado = true: rest.estado = false;

            this.myForm.patchValue({fechaNacimiento, fechaIni, ...rest});
            this.myForm.markAsPristine();
          },
          error: (valor) => {
            console.log(valor);
          }
        })

    }
  }


}
