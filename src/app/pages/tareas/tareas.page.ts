import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalTareaComponent } from '../../components/modal-tarea/modal-tarea.component';
import { TareasService } from '../../services/tareas.service';
import { Tarea } from '../../models/tarea.model';

@Component({ 
  standalone: false,
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage {

  tareas: Tarea[] = [];

  constructor(
    private modalCtrl: ModalController,
    private tareasService: TareasService
  ) {}

  ionViewWillEnter() {
    this.tareas = this.tareasService.getTareas();
  }

  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: ModalTareaComponent
    });

    modal.onDidDismiss().then(res => {
      if (res.data) {
        this.tareasService.agregarTarea(res.data);
      }
    });

    await modal.present();
  }

  eliminar(index: number) {
    this.tareasService.eliminarTarea(index);
  }
}
