import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {


  private fb          = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router );
  private messageService = inject( MessageService );


  public myForm: FormGroup = this.fb.group({
    dni:      [],
    password: [],
  });


  login() {
    const { dni, password } = this.myForm.value;

    this.authService.login( dni, password )
      .subscribe({
        next: () => {

          if(this.authService.currentUser()?.superUsuario) {
            this.messageService.add({ severity: 'success', summary: 'Inicio de Sesión Exitoso', detail: 'Bienvenido Administrador' });
            setTimeout(() => {
              this.router.navigateByUrl('/admin');
            }, 2000)

          } else {

            this.messageService.add({ severity: 'success', summary: 'Inicio de Sesión Exitoso', detail: 'Bienvenido de nuevo' });
            setTimeout(() => {
              this.router.navigateByUrl('/home');
            }, 2000)
          }

        },
        error: (message) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
        }
      })


  }


}
