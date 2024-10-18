import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../../assets/components/breadcrumb/breadcrumb.component';
import { UsuarioInterface } from '../../../../../../shared/interfaces/usuario.interface';
import { AuthService } from '../../../../../../host/src/app/auth/auth.service';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { UsuarioService } from '../../../core/services/usuario.service';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-usuarios-admin',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    TagModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
  ],
  templateUrl: './usuarios-admin.component.html',
  styles: `
  .custom-input {
    height: 2.5rem;
    width: 18.4rem;
    border-radius: 0.375rem;
    border: 1px solid #cbd5e0;
    outline: none;
    font-family: 'Open Sans', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: #4a5568;
    padding-left: 0.75rem;
  }

  .custom-input:hover {
    border-color: #a0aec0;
  }

  .custom-input:focus {
    border-color: #38b2ac;
  }
`,
})
export class UsuariosAdminComponent implements OnInit {
  public usuariosList: UsuarioInterface[] = [];
  public currentUser: UsuarioInterface | null = null;

  size: string = 'p-datatable-sm p-datatable-striped';

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService
  ) {
    this.currentUser = this.authService.currentUser();
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    if (this.currentUser) {
      const grupoId = this.currentUser.grupo.id;
      this.usuarioService.getUsuariosList().subscribe({
        next: (result) => {
          this.usuariosList = result.filter(
            (usuario) => usuario.grupo.id === grupoId
          );
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  getSeverity(idgrupo: number) {
    switch (idgrupo) {
      case 1:
        return 'info';
      case 2:
        return 'warning';
      case 3:
        return 'success';
      default:
        return 'contrast';
    }
  }
}
