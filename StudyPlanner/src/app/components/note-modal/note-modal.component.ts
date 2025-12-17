import { Component, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonHeader, IonToolbar, IonTitle,
  IonContent, IonItem, IonLabel,
  IonInput, IonTextarea,
  IonButton, ModalController,
  IonCard, IonCardContent
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-note-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    // Componentes de Ionic para el diseño oscuro
    IonHeader, IonToolbar, IonTitle,
    IonContent, IonItem, IonLabel,
    IonInput, IonTextarea,
    IonButton, IonCard, IonCardContent
  ],
  template: `
    <ion-header>
      <ion-toolbar color="accent-header">
        <ion-title>Nueva Nota</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding app-background">

      <div class="modal-container">

        <ion-card class="form-card">
          <ion-card-content class="ion-padding">

            <ion-item lines="none" class="custom-input ion-margin-bottom">
              <ion-label position="stacked">Título</ion-label>
              <ion-input
                placeholder="Ej. Recordatorio importante"
                [(ngModel)]="titulo">
              </ion-input>
            </ion-item>

            <ion-item lines="none" class="custom-input content-textarea">
              <ion-label position="stacked">Contenido</ion-label>
              <ion-textarea
                rows="8"
                placeholder="Escribe aquí los detalles de la nota..."
                [(ngModel)]="contenido">
              </ion-textarea>
            </ion-item>

            <ion-button
              expand="block"
              color="primary-accent"
              class="save-button"
              [disabled]="!titulo.trim()"
              (click)="guardar()">
              Guardar Nota
            </ion-button>

            <ion-button
              expand="block"
              fill="clear"
              color="light-text"
              class="cancel-button"
              (click)="cerrar()">
              Cancelar
            </ion-button>

          </ion-card-content>
        </ion-card>
      </div>

    </ion-content>
  `,
  styles: [`
    /* --- VARIABLES DE DISEÑO (Adaptadas a tu paleta) --- */
    :host {
      --app-dark-bg: #1A1A2E; /* Fondo oscuro de la app */
      --form-card-bg: #2C2C4E; /* Fondo de tarjetas e ítems */
      --accent-color: #5B42F3; /* Color de acento azul/morado */
      --text-color: #FFFFFF;
      --text-label-color: #C0C0C0; /* Texto secundario gris claro */
      --input-bg: #333355; /* Fondo de inputs ligeramente más oscuro que la tarjeta */
    }

    /* Asignación de colores a los componentes de Ionic */
    ion-toolbar[color="accent-header"] {
      --background: var(--accent-color); /* Color de acento para el encabezado del modal */
      --color: var(--text-color);
    }
    ion-button[color="primary-accent"] {
        --background: var(--accent-color);
        --color: var(--text-color);
        --border-radius: 4px; 
    }
    ion-button[color="light-text"] {
        --color: var(--text-label-color);
    }

    /* 1. Fondo General y Contenedor */
    .app-background {
      --background: var(--app-dark-bg);
      color: var(--text-color);
    }
    .modal-container {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding-top: 20px;
    }

    /* 2. Estilo de la Tarjeta del Formulario (Contenedor principal del modal) */
    .form-card {
      max-width: 400px;
      width: 95%;
      background: var(--form-card-bg);
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
      margin: 0;
    }

    /* 3. Estilo de los Inputs y Textarea (Tipo "Fill Solid" limpio) */
    .custom-input {
      --background: var(--input-bg); /* Fondo de input que contrasta ligeramente */
      --border-radius: 4px; /* Bordes del input */
      padding-top: 5px;
      padding-bottom: 5px;
    }

    /* El Textarea necesita un alto definido para ser un campo de notas */
    .content-textarea {
        /* Asegura que el textarea dentro del item ocupe el espacio */
        --min-height: 150px; /* Alto mínimo para el área de contenido */
    }
    
    /* Estilo de la etiqueta */
    ion-label[position="stacked"] {
        font-weight: 500;
        color: var(--text-label-color);
        font-size: 0.9em;
    }

    /* Estilo del input/textarea al escribir */
    ion-input, ion-textarea {
      --color: var(--text-color); /* Texto blanco */
      font-size: 1.05em;
    }

    /* 4. Estilos de Botones */
    .save-button {
      font-weight: 600;
      text-transform: uppercase;
      margin-top: 25px; /* Más margen después del textarea grande */
      margin-bottom: 10px;
    }
    .cancel-button {
      font-weight: 500;
      font-size: 0.9em;
    }
  `]
})
export class NoteModalComponent {

  titulo = '';
  contenido = '';

  constructor(@Optional() private modalCtrl?: ModalController) {}

  guardar() {
    // Se requiere un título y que el modal controller esté disponible
    if (!this.titulo.trim() || !this.modalCtrl) return;

    this.modalCtrl.dismiss({
      titulo: this.titulo,
      contenido: this.contenido,
      // La fecha se genera aquí para asegurar que es la fecha de creación/guardado
      fecha: new Date().toISOString().slice(0, 10)
    }, 'confirm'); // Usar 'confirm' role
  }

  cerrar() {
    if (!this.modalCtrl) return;
    this.modalCtrl.dismiss(null, 'cancel'); // Usar 'cancel' role
  }
}