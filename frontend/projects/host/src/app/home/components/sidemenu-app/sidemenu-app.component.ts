import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidemenu-app',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidemenu-app.component.html',
})
export class SidemenuAppComponent {
  @Input() name: string = '';
  @Input() url: string = '';
}
