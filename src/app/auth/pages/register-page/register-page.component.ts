import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RegisterUser } from '../../interfaces/register-user.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ValidatorsService } from 'src/app/shared/validators/Validators.service';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {


  myForm!: UntypedFormGroup;


  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly validatorsService: ValidatorsService,
  ) {}


  ngOnInit(): void {
    this.myForm = this.fb.group({
      dni: ['Y4091612', [ Validators.required, this.validatorsService.dniValidator() ] ],
      nombre: ['Erixon', [ Validators.required ] ],
      apellidos: ['Arce Justiniano', [ Validators.required ] ],
      password: ['12345', [ Validators.required, Validators.minLength(6) ] ],
      fechaNacimiento: [new Date('04/08/1999'), [ Validators.required ]],
      telefono: [647890773, [ Validators.required, Validators.pattern(/^[6-9]\d{8}$/) ] ],
      correo: ['erick@gmail.com', [ Validators.required, Validators.pattern( this.validatorsService.emailPattern ) ] ],
      repetirCorreo: ['erick@gmail.com', [ Validators.required ] ],
      direccion: ['C:/ Hernan Cortes 15', [ Validators.required ] ],
    },{
      validators: [
        this.validatorsService.isFieldOneEqualFieldTwo('correo', 'repetirCorreo')
      ]
    });
  }


  doSubmit() {

    // Solo si el formulario esta validado
    if(this.myForm.valid) {

      const newUser: RegisterUser = {
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
      };


      this.authService.register(newUser)
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/auth/login')
          },
          error: (message) => {
            Swal.fire('Error', message, 'error')
          }
        });

    }

  }

  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.myForm, field );
  }

}
