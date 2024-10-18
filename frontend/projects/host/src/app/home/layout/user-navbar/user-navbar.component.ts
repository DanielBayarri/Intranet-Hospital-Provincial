import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-user-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-navbar.component.html',
})
export class UserNavbarComponent {
  private authService = inject(AuthService);
  public user = computed(() => this.authService.currentUser());

  ngOnInit() {
    this.authService.checkAuthStatus().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
