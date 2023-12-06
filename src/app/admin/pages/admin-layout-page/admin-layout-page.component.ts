import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin-layout-page',
  templateUrl: './admin-layout-page.component.html',
  styleUrl: './admin-layout-page.component.css'
})
export class AdminLayoutPageComponent implements OnInit {
  items: MenuItem[] | undefined;

  sidebarVisible: boolean = false;

  ngOnInit(): void {
    this.items = [
      { label: 'Bienvenido', routerLink: '/admin/welcome' },
      { label: 'Usuarios', routerLink: '/admin/usuarios' },
      { label: 'Promociones', routerLink: '/admin/promociones' },
      { label: 'Planes', routerLink: '/admin/planes' },
    ];
  }
}
