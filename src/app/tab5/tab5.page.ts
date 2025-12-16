import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonHeader, IonToolbar, IonTitle,
  IonContent, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent,
  IonItem, IonLabel, IonToggle,
  IonAvatar, IonButton, IonInput
} from '@ionic/angular/standalone';

interface Materia {
  nombre: string;
  color: string;
}

@Component({
  selector: 'app-tab5',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, IonToolbar, IonTitle,
    IonContent, IonCard, IonCardHeader,
    IonCardTitle, IonCardContent,
    IonItem, IonLabel, IonToggle,
    IonAvatar, IonButton, IonInput
  ],
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  // PERFIL
  nombre = '';
  foto: string | null = null;


  // MATERIAS
  materias: Materia[] = [];
  nuevaMateria = '';
  colorMateria = '#3bf657ff';

  ngOnInit() {
    const data = localStorage.getItem('perfil');
    if (data) {
      const perfil = JSON.parse(data);
      this.nombre = perfil.nombre;
      this.foto = perfil.foto;
      this.materias = perfil.materias || [];
    }
  }

  guardarPerfil() {
    localStorage.setItem('perfil', JSON.stringify({
      nombre: this.nombre,
      foto: this.foto,
      materias: this.materias
    }));
  }

  //  SUBIR FOTO
  subirFoto(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.foto = reader.result as string;
      this.guardarPerfil();
    };
    reader.readAsDataURL(file);
  }

  //  MATERIAS
  agregarMateria() {
    if (!this.nuevaMateria.trim()) return;

    this.materias.push({
      nombre: this.nuevaMateria,
      color: this.colorMateria
    });

    this.nuevaMateria = '';
    this.colorMateria = '#3b82f6';
    this.guardarPerfil();
  }

  eliminarMateria(index: number) {
    this.materias.splice(index, 1);
    this.guardarPerfil();
  }
}
