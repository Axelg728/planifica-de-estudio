import { Component, EnvironmentInjector, inject } from '@angular/core';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  home,
  checkmarkCircle,
  documentText,
  calendar,
  person
} from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel
  ],
})
export class TabsPage {

  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    // Registrar íconos de los tabs
    addIcons({
      home,
      checkmarkCircle,
      documentText,
      calendar,
      person
    });
  }
}
