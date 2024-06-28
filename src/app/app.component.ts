
import { RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';


declare var particlesJS: any;
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent implements OnInit {
  imageData: any;
  translatedText = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchImageData();
    this.initializeParticles();
  }

  fetchImageData(): void {
    const nasaApiUrl = environment.apiUrl2;
    const apiKey2 = environment.apiKey2;

    console.log('AppComponent: Richiesta immagine NASA...');

    this.http.get<any>(nasaApiUrl, { params: { api_key: apiKey2 } }).subscribe(
      (response: any) => {
        console.log('AppComponent: Risposta immagine NASA:', response);
        this.imageData = response;
        this.translateText();
      },
      (error: any) => {
        console.error('AppComponent: Errore durante la richiesta immagine NASA:', error);
      }
    );
  }

  translateText(): void {
    if (!this.imageData || !this.imageData.explanation) {
      console.error('Image data is missing.');
      return;
    }
  
    const apiUrl = 'http://localhost:3000/translate'; // Cambia l'URL con quello del tuo server Express
    this.http.post<any>(apiUrl, { text: this.imageData.explanation, target_lang: 'it' }).subscribe(
      (response: any) => {
        if (response && response.translations && response.translations.length > 0) {
          this.translatedText = response.translations[0].text;
          console.log('Translation:', this.translatedText);
        } else {
          console.error('Translation response is invalid:', response);
        }
      },
      (error: any) => {
        console.error('Error translating text:', error);
      }
    );
  }



  initializeParticles(): void {
    // Configurazione di base per particles.js
    const particlesConfig = {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#ffffff'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          },
          polygon: {
            nb_sides: 5
          },
          image: {
            src: 'img/github.svg',
            width: 100,
            height: 100
          }
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#ffffff',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 6,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'repulse'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    };

    // Inizializza particles.js con la configurazione
    particlesJS('particles-js', particlesConfig);
  }
}
