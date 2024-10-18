import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { PrimaryBarComponent } from '../../components/primary-bar/primary-bar.component';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [PrimaryBarComponent],
  templateUrl: './user.component.html',
})
export class UserComponent {
  private authService = inject(AuthService);
  public user = computed(() => this.authService.currentUser());
}
