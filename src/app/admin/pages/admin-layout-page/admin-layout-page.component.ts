import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-admin-layout-page',
  templateUrl: './admin-layout-page.component.html',
  styleUrl: './admin-layout-page.component.css'
})
export class AdminLayoutPageComponent implements OnInit {
  items: MenuItem[] | undefined;
  itemsLogin!: MenuItem[];

  sidebarVisible: boolean = false;

  constructor(
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.items = [
      { label: 'Bienvenido', routerLink: '/admin/welcome' },
      { label: 'Usuarios', routerLink: '/admin/usuarios' },
      { label: 'Promociones', routerLink: '/admin/promociones' },
      { label: 'Planes', routerLink: '/admin/planes' },
    ];


    this.itemsLogin = [
      {
        label: 'Options',
        items: [
            {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                command: () => this.authService.logout()
            }
        ]
      }
    ];


  }
}
