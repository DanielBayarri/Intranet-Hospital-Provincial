import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  dropdownPlantillas: boolean = false;
  dropdownEtica: boolean = false;

  togglePlantillasDropdown(event: Event): void {
    event.preventDefault();
    this.dropdownPlantillas = !this.dropdownPlantillas;
  }
  toggleEticaDropdown(event: Event): void {
    event.preventDefault();
    this.dropdownEtica = !this.dropdownEtica;
  }
}
