import { Component, OnInit, inject  } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthStatus } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent implements OnInit {


  items: MenuItem[] | undefined;
  itemsLogin: MenuItem[] | undefined;
  userLogin?: string;

  private readonly authService = inject( AuthService );
  private readonly router = inject( Router );

  isLogin: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.items = [
      { label: 'Inicio', icon: 'pi pi-home', routerLink: '/' },
      { label: '¿Por qué debes elegirnos?', routerLink: '/home/por-que-my-gym' },
      { label: 'Ubicación y horario', icon: 'pi pi-map-marker', routerLink: '/home/ubicacion' },
      // { label: 'Apuntate', routerLink: '/auth/register' },
      // { label: 'My Gym', routerLink: '/auth/login' },
    ];

    if( this.authService.authStatus() === AuthStatus.authenticated ) {
      this.isLogin = true;
      this.userLogin = this.authService.currentUser()?.nombre;

      this.itemsLogin = [
        {
          label: 'Options',
          items: [
              {
                  label: 'Perfil',
                  icon: 'pi pi-user',
                  command: () => this.router.navigateByUrl('/home/perfil')
              },
              {
                  label: 'Logout',
                  icon: 'pi pi-sign-out',
                  command: () => this.authService.logout()
              }
          ]
        }
      ];

      if( this.isLogin && this.authService.currentUser()?.superUsuario ) {
        this.itemsLogin.push(
          {
            label: 'Administrador',
            items: [
              {
                label: 'Gestión My Gym',
                icon: 'pi pi-server',
                command: () => this.router.navigateByUrl('/admin/welcome')
              },
            ]
          }
        )
      }

      if ( this.isLogin ) {
        this.items.push({ label: 'Reserva clases' , routerLink: '/home/reserva-clase' })
      }


    }

  }



}
