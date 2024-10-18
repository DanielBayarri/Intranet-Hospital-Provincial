import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PrimaryBarComponent } from '../../components/primary-bar/primary-bar.component';
import { linksApps } from '../../../assets/enlaces';
import { SidemenuAppComponent } from '../../components/sidemenu-app/sidemenu-app.component';
import { FormsModule } from '@angular/forms';
import { SearchAppPipe } from '../../../../../../shared/pipes/search-app.pipe';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-apps-hospital',
  standalone: true,
  imports: [
    PrimaryBarComponent,
    SidemenuAppComponent,
    FormsModule,
    SearchAppPipe,
    InputTextModule,
  ],
  templateUrl: './apps-hospital.component.html',
})
export class AppsHospitalComponent {
  public linksApp = linksApps;

  searchInputValue: string = '';
}
