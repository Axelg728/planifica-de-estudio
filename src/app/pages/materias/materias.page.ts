import { Component } from '@angular/core';
import { MateriasService } from '../../services/materias.service';
import { Materia } from '../../models/materia.model';

@Component({ 
  standalone: false,
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
})
export class MateriasPage {

  nombre = '';
  profesor = '';
  materias: Materia[] = [];

  constructor(private materiasService: MateriasService) {}

  ionViewWillEnter() {
    this.materias = this.materiasService.getMaterias();
  }

  agregarMateria() {
    if (this.nombre && this.profesor) {
      this.materiasService.agregarMateria({
        nombre: this.nombre,
        profesor: this.profesor
      });

      this.nombre = '';
      this.profesor = '';
    }
  }

  eliminarMateria(index: number) {
    this.materiasService.eliminarMateria(index);
  }
}
