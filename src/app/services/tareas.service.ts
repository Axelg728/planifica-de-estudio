import { Injectable } from '@angular/core';
import { Tarea } from '../models/tarea.model';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private tareas: Tarea[] = [];

  getTareas() {
    return this.tareas;
  }

  agregarTarea(tarea: Tarea) {
    this.tareas.push(tarea);
  }

  eliminarTarea(index: number) {
    this.tareas.splice(index, 1);
  }
}
