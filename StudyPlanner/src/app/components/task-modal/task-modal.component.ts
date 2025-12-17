import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonHeader, IonToolbar, IonTitle,
  IonContent, IonItem, IonLabel,
  IonInput, IonButton, ModalController,
  // Mantengo los componentes de tarjeta para el contenedor visual
  IonCard, IonCardContent, IonList
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, IonToolbar, IonTitle,
    IonContent, IonItem, IonLabel,
    IonInput, IonButton, IonCard, IonCardContent, IonList
  ],
  template: `
  <ion-header>
    <ion-toolbar color="accent-header">
      <ion-title>Nueva Tarea</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content class="ion-padding app-background">

    <div class="modal-container">
      
      <ion-card class="form-card">
        <ion-card-content class="ion-padding">
          
          <ion-item lines="none" class="custom-input">
            <ion-label position="stacked">Título de la tarea</ion-label>
            <ion-input
              placeholder="Ej. Entregar proyecto"
              [(ngModel)]="titulo">
            </ion-input>
          </ion-item>

          <ion-item lines="none" class="custom-input">
            <ion-label position="stacked">Fecha</ion-label>
            <ion-input
              type="date"
              [(ngModel)]="fecha">
            </ion-input>
          </ion-item>

          <ion-button 
            expand="block" 
            color="primary-accent" 
            class="save-button"
            [disabled]="!titulo.trim()"
            (click)="guardar()">
            Guardar Tarea
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
    /* --- VARIABLES DE DISEÑO (Adaptadas a tus imágenes) --- */
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
        --background: var(--accent-color); /* El botón principal usa el acento */
        --color: var(--text-color);
        --border-radius: 4px; /* Bordes un poco más definidos como tu botón "NUEVA TAREA" */
    }
    ion-button[color="light-text"] {
        --color: var(--text-label-color); /* Color sutil para el botón de cancelar */
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
      background: var(--form-card-bg); /* Fondo que contrasta ligeramente con el fondo de la app */
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); 
      margin: 0;
    }
    
    /* 3. Estilo de los Inputs (Tipo "Fill Solid" limpio) */
    .custom-input {
      --background: var(--input-bg); /* Fondo de input que contrasta ligeramente */
      --border-radius: 4px; /* Bordes del input */
      margin-bottom: 20px;
      padding-top: 5px; /* Ajuste interno para la etiqueta */
      padding-bottom: 5px;
    }

    /* Estilo de la etiqueta */
    ion-label[position="stacked"] {
        font-weight: 500;
        color: var(--text-label-color);
        font-size: 0.9em;
    }
    
    /* Estilo del input al escribir */
    ion-input {
      --color: var(--text-color); /* Texto blanco */
      font-size: 1.05em;
    }

    /* 4. Estilos de Botones */
    .save-button {
      font-weight: 600;
      text-transform: uppercase;
      margin-top: 15px;
      margin-bottom: 10px;
    }
    .cancel-button {
      font-weight: 500;
      font-size: 0.9em;
    }
  `]
})
export class TaskModalComponent {

  titulo = '';
  fecha = new Date().toISOString().slice(0, 10); 

  constructor(private modalCtrl: ModalController) {}

  guardar() {
    if (!this.titulo.trim()) return;
    this.modalCtrl.dismiss({
      titulo: this.titulo,
      fecha: this.fecha
    }, 'confirm');
  }

  cerrar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}