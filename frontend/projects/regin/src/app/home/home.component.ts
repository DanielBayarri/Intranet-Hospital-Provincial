import { CommonModule } from '@angular/common'
import { Component, input } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { FooterComponent } from './layout/footer/footer.component'
import { SidenavComponent } from './layout/sidenav/sidenav.component'
import { HeaderComponent } from './layout/header/header.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SidenavComponent, FooterComponent, RouterOutlet],
  templateUrl: './home.component.html'
})
export class HomeComponent {}
