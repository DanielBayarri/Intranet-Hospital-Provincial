import { Component, computed, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HomeComponent } from './home/home.component';
import { AuthStatus } from '../../../shared/interfaces/auth/auth-status.enum';
import { AuthService } from '../../../host/src/app/auth/auth.service';

@Component({
  selector: 'app-root-regin',
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'regin';
}
