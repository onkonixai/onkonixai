import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonChip, IonLabel, IonBadge } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heartCircle, sparkles, bulb, shieldCheckmark, arrowForward, logoGithub, mail } from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonChip, IonLabel, IonBadge],
})
export class Tab1Page {
  constructor() {
    addIcons({ heartCircle, sparkles, bulb, shieldCheckmark, arrowForward, logoGithub, mail });
  }
}
