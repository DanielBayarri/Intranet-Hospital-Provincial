import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [BreadcrumbModule],
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    this.generateBreadcrumb();
  }

  capitalize(text: string) {
    const firstLetter = text.charAt(0);
    const rest = text.slice(1);
    return firstLetter.toUpperCase() + rest;
  }

  generateBreadcrumb() {
    const urlSegments = this.router.url.split('/').filter((segment) => segment); // Obtiene los segmentos de la URL

    this.items = urlSegments.map((segment, index) => {
      if (segment.includes('?') == true) {
        let t = segment.split('?');
        segment = t[0];
      }

      const url = '/' + urlSegments.slice(0, index + 1).join('/');

      return { label: this.capitalize(segment), routerLink: url };
    });

    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }
}
