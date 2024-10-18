import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { AuthService } from '../../../../../../host/src/app/auth/auth.service';
import { RouterLink } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, TagModule, ChipModule],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  public user = computed(() => this.authService.currentUser());

  ngOnInit() {
    this.authService.checkAuthStatus().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
