import { Component, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonHeader, IonToolbar, IonTitle,
  IonContent, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent,
  IonDatetime
} from '@ionic/angular/standalone';

import { FirestoreService, Tarea, Nota } from '../services/firestore.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tab4',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, IonToolbar, IonTitle,
    IonContent, IonCard, IonCardHeader,
    IonCardTitle, IonCardContent,
    IonDatetime
  ],
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
})
export class Tab4Page {

  /* ========= FECHA ========= */
  fechaSeleccionada = new Date().toISOString();

  get fechaSimple(): string {
    return this.fechaSeleccionada.slice(0, 10);
  }

  /* ========= DATA ========= */
  tareasDelDia$!: Observable<Tarea[]>;
  notasDelDia$!: Observable<Nota[]>;
  highlightedDates: any[] = [];

  constructor(
    @Optional() private firestore: FirestoreService
  ) {
    // 👉 Karma (sin Firebase)
    if (!this.firestore) {
      this.tareasDelDia$ = of([]);
      this.notasDelDia$ = of([]);
      this.highlightedDates = [];
      return;
    }

    // 👉 App real
    this.cargarMarcas();
    this.actualizarContenidoDelDia();
  }

  cambiarFecha(ev: any) {
    this.fechaSeleccionada = ev.detail.value;
    this.actualizarContenidoDelDia();
  }

  actualizarContenidoDelDia() {
    if (!this.firestore) return;

    this.tareasDelDia$ = this.firestore.getTareas().pipe(
      map(t => t.filter(x => x.fecha === this.fechaSimple))
    );

    this.notasDelDia$ = this.firestore.getNotas().pipe(
      map(n => n.filter(x => x.fecha === this.fechaSimple))
    );
  }

  cargarMarcas() {
    if (!this.firestore) return;

    this.firestore.getTareas().subscribe(tareas => {
      this.firestore!.getNotas().subscribe(notas => {
        this.highlightedDates = [
          ...tareas.map(t => ({
            date: t.fecha,
            textColor: '#2563eb',
            backgroundColor: '#dbeafe'
          })),
          ...notas.map(n => ({
            date: n.fecha,
            textColor: '#7c3aed',
            backgroundColor: '#ede9fe'
          }))
        ];
      });
    });
  }
}
