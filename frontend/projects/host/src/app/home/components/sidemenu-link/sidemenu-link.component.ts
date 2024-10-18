import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-sidemenu-link',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './sidemenu-link.component.html',
})
export class SidemenuLinkComponent {
  @Input() name: string = '';
  @Input() icon: string = '';
  @Input() url: string = '';
  @Input() isLink: boolean = false;
}
