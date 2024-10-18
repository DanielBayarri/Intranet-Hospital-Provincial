import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-favourite-app',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favourite-app.component.html',
})
export class FavouriteAppComponent {
  @Input() name = '';
  @Input() url = '';
}
