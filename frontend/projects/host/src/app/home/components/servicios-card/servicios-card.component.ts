import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-servicios-card',
  standalone: true,
  imports: [],
  templateUrl: './servicios-card.component.html',
})
export class ServiciosCardComponent {
  @Input() nombre: string = '';
  @Input() servicio: string = '';
  @Input() telefono: string = '';
  @Input() email: string = '';
}
