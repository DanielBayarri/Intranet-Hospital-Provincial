import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-primary-bar',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './primary-bar.component.html',
})
export class PrimaryBarComponent { }
