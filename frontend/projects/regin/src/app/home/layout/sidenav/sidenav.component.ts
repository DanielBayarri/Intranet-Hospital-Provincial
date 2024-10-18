import { Component, computed, inject } from '@angular/core';
import { itemsNav } from './items-nav';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../../../host/src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidenav.component.html',
})
export class SidenavComponent {
  itemsNav = itemsNav;

  private authService = inject(AuthService);
  public user = computed(() => this.authService.currentUser());

  ngOnInit() {
    this.authService.checkAuthStatus().subscribe();
  }
}
