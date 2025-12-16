import { Component, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonHeader, IonToolbar, IonTitle,
  IonContent, IonButton, IonCard,
  IonCardHeader, IonCardTitle,
  IonCardContent, IonIcon, ModalController
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { add, trash } from 'ionicons/icons';

import { FirestoreService, Nota } from '../services/firestore.service';
import { Observable, of } from 'rxjs';

import { NoteModalComponent } from '../components/note-modal/note-modal.component';

addIcons({ add, trash });

@Component({
  selector: 'app-tab3',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle,
    IonContent, IonButton, IonCard,
    IonCardHeader, IonCardTitle,
    IonCardContent, IonIcon
  ],
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {

  notas$!: Observable<Nota[]>;

  constructor(
    @Optional() private modalCtrl: ModalController,
    @Optional() private firestore: FirestoreService
  ) {
    // 👉 Karma
    if (!this.firestore) {
      this.notas$ = of([]);
      return;
    }

    // 👉 App real
    this.notas$ = this.firestore.getNotas();
  }

  async nuevaNota() {
    if (!this.modalCtrl || !this.firestore) return;

    const modal = await this.modalCtrl.create({
      component: NoteModalComponent
    });

    modal.onDidDismiss().then(res => {
      if (res.data) {
        this.firestore.addNota(res.data);
      }
    });

    await modal.present();
  }

  eliminar(id?: string) {
    if (!id || !this.firestore) return;
    this.firestore.deleteNota(id);
  }
}
