import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RegisterUser } from '../../interfaces/register-user.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/shared/validators/Validators.service';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/admin/services/admin.service';
import { Plan } from 'src/app/admin/interfaces/plan';
import { DropdownPlan } from 'src/app/shared/interfaces/dropdown-plan.interface';
import { DropdownChangeEvent } from 'primeng/dropdown';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {


  myForm!: UntypedFormGroup;
  selectPlan: DropdownPlan[] = [];
  planes!: Plan[];

  visualPlan?: Plan;


  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly authService: AuthService,
    private readonly adminService: AdminService,
    private readonly router: Router,
    private readonly validatorsService: ValidatorsService,
    private readonly messageService: MessageService
  ) {}


  ngOnInit(): void {
    this.myForm = this.fb.group({
      dni: [, [ Validators.required, this.validatorsService.dniValidator() ] ],
      nombre: [, [ Validators.required ] ],
      apellidos: [, [ Validators.required ] ],
      password: [, [ Validators.required, Validators.minLength(6) ] ],
      fechaNacimiento: [, [ Validators.required ]],
      plan: [, [Validators.required]],
      telefono: [, [ Validators.required, Validators.pattern(/^[6-9]\d{8}$/) ] ],
      correo: [, [ Validators.required, Validators.pattern( this.validatorsService.emailPattern ) ] ],
      repetirCorreo: [, [ Validators.required ] ],
      direccion: [, [ Validators.required ] ],
    },{
      validators: [
        this.validatorsService.isFieldOneEqualFieldTwo('correo', 'repetirCorreo')
      ]
    });

    this.adminService.doGet<Plan[]>('/plan', { responseType: 'json'} )
      .subscribe({
        next: (values) => {

          this.planes = values;

          for (const value of values ) {
            const { _id:id, nombre } = value;
            this.selectPlan.push({ id, nombre });
          }
        }
      }
    )


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
        plan: this.myForm.value.plan.id,
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
            this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Usuario registrado con exito' });
            setTimeout(() => {
              this.router.navigateByUrl('/auth/login')
            }, 1500)
          },
          error: (message) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
          }
        });

    }

  }

  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.myForm, field );
  }


  changePlan(event: DropdownChangeEvent) {
    const id = event.value.id;
    this.visualPlan = this.planes.find( (plan) =>  plan._id === id );
  }

}
