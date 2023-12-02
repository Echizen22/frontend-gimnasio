import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio-page',
  templateUrl: './inicio-page.component.html',
  styleUrls: ['./inicio-page.component.css']
})
export class InicioPageComponent {
  images: string[] = [
    'assets/images/horario_actividades.png',
    'assets/images/información.png',
    'assets/images/tu_eliges.png',
    // Agrega más rutas de imágenes según sea necesario
  ];



}
