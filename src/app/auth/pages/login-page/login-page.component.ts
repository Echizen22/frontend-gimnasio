import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {


  private fb          = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router );


  public myForm: FormGroup = this.fb.group({
    dni:      ['Y4091612'],
    password: ['12345'],
  });


  login() {
    const { dni, password } = this.myForm.value;

    this.authService.login( dni, password )
      .subscribe({
        next: () => this.router.navigateByUrl('/home/inicio'),
        error: (message) => {
          Swal.fire('Error', message, 'error' );
          // console.log(message);
        }
      })


  }


}
