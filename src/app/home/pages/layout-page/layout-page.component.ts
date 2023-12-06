import { Component, OnInit  } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent implements OnInit {



  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      { label: 'Inicio', icon: 'pi pi-home', routerLink: '/' },
      { label: '¿Por qué debes elegirnos?', routerLink: '/home/por-que-my-gym' },
      { label: 'Ubicación y horario', icon: 'pi pi-map-marker', routerLink: '/home/ubicacion' },
      // { label: 'Apuntate', routerLink: '/auth/register' },
      // { label: 'My Gym', routerLink: '/auth/login' },
    ];
  }
}
