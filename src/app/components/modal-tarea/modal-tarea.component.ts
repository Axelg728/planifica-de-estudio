import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({  
  standalone: false,
  selector: 'app-modal-tarea',
  templateUrl: './modal-tarea.component.html',
  styleUrls: ['./modal-tarea.component.scss'],
})
export class ModalTareaComponent {

  titulo = '';
  materia = '';
  fecha = '';

  constructor(private modalCtrl: ModalController) {}

  guardar() {
    this.modalCtrl.dismiss({
      titulo: this.titulo,
      materia: this.materia,
      fecha: this.fecha
    });
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}
