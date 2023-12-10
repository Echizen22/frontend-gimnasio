import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2'
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
            this.router.navigateByUrl('/admin');
          } else {
            this.router.navigateByUrl('/home');
          }

        },
        error: (message) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
          // Swal.fire('Error', message, 'error' );
          // console.log(message);
        }
      })


  }


}
