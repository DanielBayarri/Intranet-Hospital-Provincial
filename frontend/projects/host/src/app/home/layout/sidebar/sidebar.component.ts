import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { PrimaryBarComponent } from '../../components/primary-bar/primary-bar.component';
import { SidemenuLinkComponent } from '../../components/sidemenu-link/sidemenu-link.component';
import { RouterModule } from '@angular/router';
import { FavouriteAppComponent } from '../../components/favourite-app/favourite-app.component';
import { AuthService } from '../../../auth/auth.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { SidemenuAppComponent } from '../../components/sidemenu-app/sidemenu-app.component';
import { linksApps } from '../../../assets/enlaces';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    PrimaryBarComponent,
    SidemenuLinkComponent,
    RouterModule,
    FavouriteAppComponent,
    LoaderComponent,
    SidemenuAppComponent,
    LoaderComponent,
  ],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  private authService = inject(AuthService);
  public user = computed(() => this.authService.currentUser());

  public linksApp = linksApps;
  public verAppNavegador = false;

  public loader = false;

  ngOnInit() {
    this.authService.checkAuthStatus().subscribe();
  }

  startLoader() {
    this.loader = true;
  }

  onShowApp() {
    this.verAppNavegador = !this.verAppNavegador;
  }
}
