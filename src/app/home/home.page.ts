import { Component, OnInit, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
    sparkles, arrowDown, mail, heartCircle,
    shieldCheckmark, bulb, eyeOutline, chevronUp,
    checkmarkCircle, scanOutline, gitNetworkOutline,
    documentTextOutline, flaskOutline, medkitOutline,
    businessOutline, watchOutline, serverOutline,
    arrowBackCircleOutline, logoLinkedin, closeOutline
} from 'ionicons/icons';

declare var particlesJS: any;

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    imports: [CommonModule, IonContent, IonIcon],
})
export class HomePage implements OnInit, AfterViewInit, OnDestroy {

    showBackToTop = false;
    activeNode = 0; // Start with first node
    selectedMember: any = null;
    activeEcoNode: number | null = null;
    private hoverTimeout: any;
    private autoCycleInterval: any;
    typedText = '';
    cursorVisible = true;
    private typingInterval: any;
    private cursorInterval: any;

    readonly phrases = [
        'Beyin Tümörü Teşhisi',
        'Tedavi Optimizasyonu',
        'Medikal Görüntü Analizi',
        '3D MRI Segmentasyonu',
        'Derin Öğrenme'
    ];
    private phraseIdx = 0;
    private charIdx = 0;
    private isDeleting = false;


    teamMembers = [
        {
            name: 'Rabia Kıratlı',
            role: 'Takım Kaptanı & AI Developer',
            image: 'assets/team/rabia.png',
            color: '#00b894',
            linkedin: 'https://www.linkedin.com/in/rabiakiratlieng/',
            bio: 'AI Developer | Focused on Computer Vision, NLP and Predictive Analytics'
        },
        {
            name: 'Hakan Çiftçi',
            role: 'Full Stack Developer',
            image: 'assets/team/hakan.png',
            color: '#0984e3',
            linkedin: 'https://www.linkedin.com/in/hakan-%C3%A7ift%C3%A7i-166893254/',
            bio: 'Full Stack Developer'
        },
        {
            name: 'Tuncay Bayır',
            role: 'AI Developer',
            image: 'assets/team/tuncay.png',
            color: '#e57a00ff',
            linkedin: 'https://www.linkedin.com/in/tuncayorgundar/',
            bio: 'AI Developer'
        }
    ];


    ecoNodes = [
        {
            icon: 'scan-outline', color: '#6c5ce7', rgb: '108, 92, 231', ox: 0, oy: -180, lp: 'top',
            title: 'MRI Görüntüleme',
            desc: 'T1/T2 ve FLAIR MRI sekanslarından elde edilen beyin tarama görüntüleri. DICOM formatında işlenerek model girdisi oluşturulur.',
            tags: ['DICOM', 'T1/T2', 'FLAIR', '3D Seg.']
        },
        {
            icon: 'git-network-outline', color: '#0984e3', rgb: '9, 132, 227', ox: 127, oy: -127, lp: 'tr',
            title: 'Genomik Veri',
            desc: 'IDH mutasyonu, MGMT metilasyonu ve 1p/19q kodelerasyon gibi biyomarkerlar tümör sınıflandırmasına katkı sağlar.',
            tags: ['IDH', 'MGMT', 'WGS', 'Biyomarker']
        },
        {
            icon: 'document-text-outline', color: '#0984e3', rgb: '9, 132, 227', ox: 180, oy: 0, lp: 'r',
            title: 'Klinik Kayıtlar',
            desc: 'Hasta yaşı, semptom süresi ve nörolojik muayene bulguları model bağlamını zenginleştirir.',
            tags: ['Anamnez', 'Nöroloji', 'EHR', 'ICD-10']
        },
        {
            icon: 'flask-outline', color: '#00b894', rgb: '0, 184, 148', ox: 127, oy: 127, lp: 'br',
            title: 'Klinik Denemeler',
            desc: 'Onkoloji klinik trial tabanlarından elde edilen tedavi yanıt verileri model çıktılarıyla kıyaslanır.',
            tags: ['RCT', 'ClinicalTrials', 'Faz II/III']
        },
        {
            icon: 'medkit-outline', color: '#00b894', rgb: '0, 184, 148', ox: 0, oy: 180, lp: 'b',
            title: 'Eczacılık Verisi',
            desc: 'Temozolomid ve bevacizumab doz-yanıt ilişkileri tedavi öneri sistemine entegre edilir.',
            tags: ['Temozolomid', 'Bevacizumab', 'PK/PD']
        },
        {
            icon: 'business-outline', color: '#e17055', rgb: '225, 112, 85', ox: -127, oy: 127, lp: 'bl',
            title: 'Hastane Verileri',
            desc: 'Ameliyat notları, patoloji raporları ve postop takip verileri prognoz modellemesinde kullanılır.',
            tags: ['Patoloji', 'HL7 FHIR', 'IHE']
        },
        {
            icon: 'watch-outline', color: '#e17055', rgb: '225, 112, 85', ox: -180, oy: 0, lp: 'l',
            title: 'Giyilebilir Cihazlar',
            desc: 'Akıllı saat ve sensörlerden gelen kalp atışı, oksijen satürasyonu verileri yaşam kalitesini izler.',
            tags: ['Wearable', 'IoT', 'EEG', 'SpO2']
        },
        {
            icon: 'server-outline', color: '#6c5ce7', rgb: '108, 92, 231', ox: -127, oy: -127, lp: 'tl',
            title: 'E-Sağlık Kayıtları',
            desc: 'HIPAA/GDPR uyumlu elektronik sağlık kayıt sistemlerinden elde edilen yapılandırılmış hasta verileri.',
            tags: ['HIPAA', 'GDPR', 'FHIR R4']
        },
    ];


    aboutCards = [
        { icon: 'bulb', title: 'Erken Teşhis', desc: 'Yapay zeka destekli MR analizi ile tümörlerin erken ve doğru tespiti', color: '#6c5ce7' },
        { icon: 'heart-circle', title: 'Tedavi Optimizasyonu', desc: 'Kişiselleştirilmiş tedavi planları ve yan etki öngörüsü', color: '#0984e3' },
        { icon: 'eye-outline', title: 'Açıklanabilir AI', desc: 'Attention mekanizması ile şeffaf ve anlaşılır karar desteği', color: '#00b894' },
        { icon: 'shield-checkmark', title: 'Güvenli & Uyumlu', desc: 'HIPAA/GDPR uyumlu güvenli veri işleme altyapısı', color: '#e17055' },
    ];

    constructor(private ngZone: NgZone) {
        addIcons({ sparkles, arrowDown, mail, heartCircle, shieldCheckmark, bulb, eyeOutline, chevronUp, checkmarkCircle, scanOutline, gitNetworkOutline, documentTextOutline, flaskOutline, medkitOutline, businessOutline, watchOutline, serverOutline, arrowBackCircleOutline, logoLinkedin, closeOutline });
    }

    ngOnInit() {
        this.startTyping();
        // Skip initial auto-cycle for ecosystem as per user request to hide it initially
    }

    ngAfterViewInit() {
        this.loadParticlesJS();
        this.initScrollAnimations();
        this.cursorInterval = setInterval(() => this.cursorVisible = !this.cursorVisible, 530);
    }

    ngOnDestroy() {
        clearInterval(this.typingInterval);
        clearInterval(this.cursorInterval);
        this.stopAutoCycle();
    }

    // ----- Particles.js -----
    loadParticlesJS() {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        script.onload = () => {
            this.ngZone.runOutsideAngular(() => {
                particlesJS('particles-js', {
                    particles: {
                        number: { value: 80, density: { enable: true, value_area: 800 } },
                        color: { value: '#6c5ce7' },
                        shape: { type: 'circle' },
                        opacity: {
                            value: 0.3,
                            random: true,
                            anim: { enable: true, speed: 0.8, opacity_min: 0.1, sync: false }
                        },
                        size: {
                            value: 3,
                            random: true,
                            anim: { enable: true, speed: 2, size_min: 0.5, sync: false }
                        },
                        line_linked: {
                            enable: true,
                            distance: 150,
                            color: '#6c5ce7',
                            opacity: 0.12,
                            width: 1
                        },
                        move: {
                            enable: true,
                            speed: 1.2,
                            direction: 'none',
                            random: true,
                            straight: false,
                            out_mode: 'out',
                            bounce: false,
                            attract: { enable: true, rotateX: 600, rotateY: 1200 }
                        }
                    },
                    interactivity: {
                        detect_on: 'canvas',
                        events: {
                            onhover: { enable: true, mode: 'repulse' },
                            onclick: { enable: true, mode: 'push' },
                            resize: true
                        },
                        modes: {
                            grab: { distance: 180, line_linked: { opacity: 0.25 } },
                            repulse: { distance: 100, duration: 0.4 },
                            push: { particles_nb: 4 }
                        }
                    },
                    retina_detect: true
                });
            });
        };
        document.head.appendChild(script);
    }

    // ----- Typing Effect -----
    startTyping() {
        this.typingInterval = setInterval(() => {
            const phrase = this.phrases[this.phraseIdx];
            if (!this.isDeleting) {
                this.typedText = phrase.substring(0, this.charIdx + 1);
                this.charIdx++;
                if (this.charIdx === phrase.length) {
                    this.isDeleting = true;
                    clearInterval(this.typingInterval);
                    setTimeout(() => this.startTyping(), 2000);
                    return;
                }
            } else {
                this.typedText = phrase.substring(0, this.charIdx - 1);
                this.charIdx--;
                if (this.charIdx === 0) {
                    this.isDeleting = false;
                    this.phraseIdx = (this.phraseIdx + 1) % this.phrases.length;
                }
            }
        }, this.isDeleting ? 40 : 80);
    }

    // ----- Scroll Animations -----
    initScrollAnimations() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const el = entry.target as HTMLElement;
                        const delay = parseInt(el.dataset['delay'] || '0', 10);
                        setTimeout(() => el.classList.add('visible'), delay);

                    }
                });
            },
            { threshold: 0.15 }
        );

        setTimeout(() => {
            document.querySelectorAll('.anim').forEach(el => observer.observe(el));
        }, 100);
    }


    startAutoCycle() {
        this.stopAutoCycle();
        this.autoCycleInterval = setInterval(() => {
            const current = this.activeEcoNode ?? -1;
            this.activeEcoNode = (current + 1) % this.ecoNodes.length;
        }, 5000);
    }

    stopAutoCycle() {
        if (this.autoCycleInterval) {
            clearInterval(this.autoCycleInterval);
        }
    }

    resetAutoCycle() {
        this.stopAutoCycle();
        this.startAutoCycle();
    }

    hoverNode(idx: number) {
        this.stopAutoCycle();
        // Do not update activeEcoNode on hover as per user request
    }

    selectNode(idx: number) {
        this.activeEcoNode = idx;
        this.resetAutoCycle();
    }

    closeNode() {
        this.activeEcoNode = null;
    }

    leaveNode() {
        this.startAutoCycle();
    }

    openMember(m: any) {
        this.selectedMember = m;
    }

    closeMember() {
        this.selectedMember = null;
    }

    scrollTo(id: string) {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }

    scrollToTop() {
        const c = document.querySelector('ion-content');
        if (c) (c as any).scrollToTop(600);
    }

    onScroll(e: any) {
        this.showBackToTop = e.detail.scrollTop > 500;
    }
}
