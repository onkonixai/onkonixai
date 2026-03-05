import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonChip, IonLabel, IonBadge, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoLinkedin, logoGithub, mail, schoolOutline, ribbonOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonChip, IonLabel, IonBadge, IonButton],
})
export class Tab3Page {
  constructor() {
    addIcons({ logoLinkedin, logoGithub, mail, schoolOutline, ribbonOutline });
  }

  teamMembers = [
    {
      name: 'Takım Üyesi 1',
      role: 'Proje Lideri',
      department: 'Bilgisayar Mühendisliği',
      avatar: '👨‍💻',
      color: '#6c5ce7'
    },
    {
      name: 'Takım Üyesi 2',
      role: 'AI/ML Geliştirici',
      department: 'Yazılım Mühendisliği',
      avatar: '👩‍🔬',
      color: '#00cec9'
    },
    {
      name: 'Takım Üyesi 3',
      role: 'Veri Bilimci',
      department: 'Bilgisayar Mühendisliği',
      avatar: '👨‍🔬',
      color: '#fd79a8'
    },
    {
      name: 'Takım Üyesi 4',
      role: 'Backend Geliştirici',
      department: 'Yazılım Mühendisliği',
      avatar: '👩‍💻',
      color: '#00b894'
    },
    {
      name: 'Takım Üyesi 5',
      role: 'Frontend Geliştirici',
      department: 'Bilgisayar Mühendisliği',
      avatar: '🧑‍💻',
      color: '#fdcb6e'
    }
  ];

  advisor = {
    name: 'Danışman Hoca',
    role: 'Proje Danışmanı',
    department: 'Bilgisayar Mühendisliği Bölümü',
    avatar: '👨‍🏫',
    color: '#a29bfe'
  };
}
