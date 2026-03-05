import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonChip, IonLabel, IonBadge } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { analyticsOutline, codeSlash, hardwareChip, medkit, layers, gitBranch, statsChart, checkmarkCircle } from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonChip, IonLabel, IonBadge]
})
export class Tab2Page {
  constructor() {
    addIcons({ analyticsOutline, codeSlash, hardwareChip, medkit, layers, gitBranch, statsChart, checkmarkCircle });
  }
}
