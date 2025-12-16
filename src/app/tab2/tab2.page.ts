import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonHeader, IonToolbar, IonTitle,
  IonContent, IonButton, IonList,
  IonItem, IonLabel, IonCheckbox,
  IonIcon, ModalController
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { add, trash } from 'ionicons/icons';

import { FirestoreService, Tarea } from '../services/firestore.service';
import { Observable } from 'rxjs';

import { TaskModalComponent } from '../components/task-modal/task-modal.component';

addIcons({ add, trash });

@Component({
  selector: 'app-tab2',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle,
    IonContent, IonButton, IonList,
    IonItem, IonLabel, IonCheckbox,
    IonIcon
  ],
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {

  // 🔹 Todas las tareas desde Firebase
  tareas$!: Observable<Tarea[]>;

  // ✅ INYECCIÓN SEGURA (NO ROMPE KARMA)
  private modalCtrl = inject(ModalController, { optional: true });
  private firestore = inject(FirestoreService);

  constructor() {
    this.tareas$ = this.firestore.getTareas();
  }

  // 🔹 Crear nueva tarea con fecha
  async nuevaTarea() {
    // 👉 Si no existe (Karma), simplemente no hace nada
    if (!this.modalCtrl) return;

    const modal = await this.modalCtrl.create({
      component: TaskModalComponent
    });

    modal.onDidDismiss().then(res => {
      if (res.data) {
        this.firestore.addTarea({
          titulo: res.data.titulo,
          fecha: res.data.fecha,
          completada: false
        });
      }
    });

    await modal.present();
  }

  // 🔹 Marcar como completada
  toggle(t: Tarea) {
    if (!t.id) return;
    this.firestore.updateTarea(t.id, !t.completada);
  }

  // 🔹 Eliminar tarea
  eliminar(id?: string) {
    if (!id) return;
    this.firestore.deleteTarea(id);
  }
}
