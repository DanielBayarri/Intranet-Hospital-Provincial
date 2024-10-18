import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimaryBarComponent } from '../../components/primary-bar/primary-bar.component';
import { InputTextModule } from 'primeng/inputtext';
import { ServiciosCardComponent } from '../../components/servicios-card/servicios-card.component';
import { ServiciosList } from '../../../assets/services';
import { SearchServicePipe } from '../../../../../../shared/pipes/search-service.pipe';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    FormsModule,
    PrimaryBarComponent,
    InputTextModule,
    ServiciosCardComponent,
    SearchServicePipe,
  ],
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  searchInputValue: string = '';
  serviciosList = ServiciosList;
}
