import { Component, OnInit, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
    sparkles, arrowDown, mail, heartCircle,
    shieldCheckmark, bulb, eyeOutline, chevronUp,
    checkmarkCircle
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

    animatedMetrics = [
        { label: 'Accuracy', value: 0, target: 95.2, color: '#6c5ce7', delay: 0 },
        { label: 'Precision', value: 0, target: 93.8, color: '#0984e3', delay: 200 },
        { label: 'Recall', value: 0, target: 94.1, color: '#00b894', delay: 400 },
        { label: 'F1-Score', value: 0, target: 93.9, color: '#e17055', delay: 600 },
    ];

    teamMembers = [
        { name: 'Rabia Kıratlı', role: 'Proje Lideri & AI Geliştirici', image: 'assets/team/rabia.png', color: '#00b894' },
        { name: 'Hakan Çiftçi', role: 'Full Stack Developer', image: 'assets/team/hakan.png', color: '#0984e3' },
        { name: 'Tuncay Bayır', role: 'Görüntü İşleme', image: 'assets/team/tuncay.png', color: '#6c5ce7' }
    ];

    techStack = [
        { name: 'TensorFlow', icon: '🧠' },
        { name: 'PyTorch', icon: '🔥' },
        { name: 'Python', icon: '🐍' },
        { name: 'OpenCV', icon: '👁️' },
        { name: 'NumPy', icon: '📊' },
        { name: 'Scikit-learn', icon: '📈' },
        { name: 'DICOM', icon: '🏥' },
        { name: 'CUDA', icon: '⚡' },
    ];

    pipelineSteps = [
        { num: '01', title: 'MRI Veri Girişi', desc: 'DICOM formatında beyin MRI görüntüleri', icon: '🧲' },
        { num: '02', title: 'Ön İşleme', desc: 'Normalizasyon ve augmentasyon', icon: '⚙️' },
        { num: '03', title: 'AI Model', desc: 'CNN + Attention derin öğrenme', icon: '🧠' },
        { num: '04', title: 'Sınıflandırma', desc: '4 tümör türü tespiti', icon: '🎯' },
        { num: '05', title: 'Segmentasyon', desc: 'Piksel düzeyinde tümör tespiti', icon: '🔬' },
        { num: '06', title: 'Tedavi Planı', desc: 'Kişiselleştirilmiş öneri sistemi', icon: '💊' },
    ];

    aboutCards = [
        { icon: 'bulb', title: 'Erken Teşhis', desc: 'Yapay zeka destekli MR analizi ile tümörlerin erken ve doğru tespiti', color: '#6c5ce7' },
        { icon: 'heart-circle', title: 'Tedavi Optimizasyonu', desc: 'Kişiselleştirilmiş tedavi planları ve yan etki öngörüsü', color: '#0984e3' },
        { icon: 'eye-outline', title: 'Açıklanabilir AI', desc: 'Attention mekanizması ile şeffaf ve anlaşılır karar desteği', color: '#00b894' },
        { icon: 'shield-checkmark', title: 'Güvenli & Uyumlu', desc: 'HIPAA/GDPR uyumlu güvenli veri işleme altyapısı', color: '#e17055' },
    ];

    constructor(private ngZone: NgZone) {
        addIcons({ sparkles, arrowDown, mail, heartCircle, shieldCheckmark, bulb, eyeOutline, chevronUp, checkmarkCircle });
    }

    ngOnInit() {
        this.startTyping();
    }

    ngAfterViewInit() {
        this.loadParticlesJS();
        this.initScrollAnimations();
        this.cursorInterval = setInterval(() => this.cursorVisible = !this.cursorVisible, 530);
    }

    ngOnDestroy() {
        clearInterval(this.typingInterval);
        clearInterval(this.cursorInterval);
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

                        if (el.classList.contains('metrics-trigger')) {
                            this.animateMetrics();
                        }
                    }
                });
            },
            { threshold: 0.15 }
        );

        setTimeout(() => {
            document.querySelectorAll('.anim').forEach(el => observer.observe(el));
        }, 100);
    }

    animateMetrics() {
        this.animatedMetrics.forEach((m) => {
            setTimeout(() => {
                const duration = 1800;
                const start = performance.now();
                const animate = (now: number) => {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 4);
                    m.value = Math.round(eased * m.target * 10) / 10;
                    if (progress < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
            }, m.delay);
        });
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
