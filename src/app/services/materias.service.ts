import { Injectable } from '@angular/core';
import { Materia } from '../models/materia.model';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  private materias: Materia[] = [];

  getMaterias() {
    return this.materias;
  }

  agregarMateria(materia: Materia) {
    this.materias.push(materia);
  }

  eliminarMateria(index: number) {
    this.materias.splice(index, 1);
  }
}
