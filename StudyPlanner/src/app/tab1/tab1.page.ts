import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonHeader, IonToolbar, IonTitle,
  IonContent, IonCard, IonCardContent
} from '@ionic/angular/standalone';

import { FirestoreService, Tarea, Nota } from '../services/firestore.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-tab1',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle,
    IonContent, IonCard, IonCardContent
  ],
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {

  fecha = new Date().toLocaleDateString('es-MX', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  tareas$: Observable<Tarea[]>;
  notas$: Observable<Nota[]>;

  totalTareas$!: Observable<number>;
  tareasPendientes$!: Observable<number>;
  totalNotas$!: Observable<number>;

  constructor(private firestore: FirestoreService) {
    this.tareas$ = this.firestore.getTareas();
    this.notas$ = this.firestore.getNotas();

    this.totalTareas$ = this.tareas$.pipe(
      map(t => t.length)
    );

    this.tareasPendientes$ = this.tareas$.pipe(
      map(t => t.filter(x => !x.completada).length)
    );

    this.totalNotas$ = this.notas$.pipe(
      map(n => n.length)
    );
  }
}
