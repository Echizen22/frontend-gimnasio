import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/admin/interfaces/usuarios';
import { AdminService } from 'src/app/admin/services/admin.service';
import { User } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  user: User | null = null;

  constructor(
    private readonly authService: AuthService,
    private readonly adminService: AdminService
  ) {
  }


  ngOnInit(): void {

    if( this.authService.currentUser() !== null ) {
      this.adminService.doGetWithId<User>(`/usuario`, this.authService.currentUser()!._id, { responseType: 'json' })
          .subscribe({
            next: (valor) => {
              this.user = valor;
            },
            error: (valor) => {
              console.log(valor);
            }
          })

    }

  }




}
