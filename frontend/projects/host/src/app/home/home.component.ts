import { Component, inject } from '@angular/core';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FaqComponent } from './layout/faq/faq.component';
import { MenuComponent } from './layout/menu/menu.component';
import { FooterComponent } from './layout/footer/footer.component';
import { UserNavbarComponent } from './layout/user-navbar/user-navbar.component';
import { DocumentsComponent } from './layout/documents/documents.component';
import { HeaderComponent } from './layout/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    UserNavbarComponent,
    HeaderComponent,
    NavbarComponent,
    SidebarComponent,
    FaqComponent,
    MenuComponent,
    DocumentsComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
