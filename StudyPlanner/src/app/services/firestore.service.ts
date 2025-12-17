import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  updateDoc,
  doc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Tarea {
  id?: string;
  titulo: string;
   fecha: string; 
  completada: boolean;
}

export interface Nota {
  id?: string;
  titulo: string;
  contenido: string;
    fecha: string;  
}

@Injectable({ providedIn: 'root' })
export class FirestoreService {

  private firestore = inject(Firestore);

  // 🔹 TAREAS
  getTareas(): Observable<Tarea[]> {
    const ref = collection(this.firestore, 'tareas');
    return collectionData(ref, { idField: 'id' }) as Observable<Tarea[]>;
  }

  addTarea(tarea: Tarea) {
    const ref = collection(this.firestore, 'tareas');
    return addDoc(ref, tarea);
  }

  updateTarea(id: string, completada: boolean) {
    return updateDoc(doc(this.firestore, `tareas/${id}`), { completada });
  }

  deleteTarea(id: string) {
    return deleteDoc(doc(this.firestore, `tareas/${id}`));
  }

  // 🔹 NOTAS
  getNotas(): Observable<Nota[]> {
    const ref = collection(this.firestore, 'notas');
    return collectionData(ref, { idField: 'id' }) as Observable<Nota[]>;
  }

  addNota(nota: Nota) {
    const ref = collection(this.firestore, 'notas');
    return addDoc(ref, nota);
  }

  deleteNota(id: string) {
    return deleteDoc(doc(this.firestore, `notas/${id}`));
  }

  // 🔹 EVENTOS / CALENDARIO
getEventos() {
  const ref = collection(this.firestore, 'eventos');
  return collectionData(ref, { idField: 'id' }) as any;
}

addNotaDia(nota: Nota) {
  const ref = collection(this.firestore, 'notas');
  return addDoc(ref, nota);
}

}
