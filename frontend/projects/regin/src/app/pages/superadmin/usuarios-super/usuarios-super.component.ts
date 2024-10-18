import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  CreateUsuarioInterface,
  UsuarioInterface,
} from '../../../../../../shared/interfaces/usuario.interface';
import { UsuarioService } from '../../../core/services/usuario.service';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { TableModule } from 'primeng/table';
import { BreadcrumbComponent } from '../../../assets/components/breadcrumb/breadcrumb.component';
import { TagModule } from 'primeng/tag';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GrupoService } from '../../../core/services/grupo.service';
import { GrupoListInterface } from '../../../../../../shared/interfaces/grupo.interface';
import { ServicioListInterface } from '../../../../../../shared/interfaces/servicio.interface';
import { RoleInterface } from '../../../../../../shared/interfaces/role.interface';
import { RoleService } from '../../../core/services/role.service';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
  selector: 'app-usuarios-super',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    TagModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    TooltipModule,
    ButtonModule,
    PanelModule,
    InputTextModule,
    DropdownModule,
    ReactiveFormsModule,
    ToastModule,
    ConfirmPopupModule,
    ToggleButtonModule,
  ],
  providers: [ConfirmationService, MessageService],

  templateUrl: './usuarios-super.component.html',
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
export class UsuariosSuperComponent {
  public usuariosList: UsuarioInterface[] = [];

  public usuarioForm: FormGroup;
  public oldEditUsuario: UsuarioInterface | null = null;
  public isEditingUsuario: boolean = false;

  public gruposList: GrupoListInterface[] = [];
  public serviciosList: ServicioListInterface[] = [];
  public rolesList: RoleInterface[] = [];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private grupoService: GrupoService,
    private roleService: RoleService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(1)]],
      apellidos: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      email: ['', [Validators.required]],
      grupo: ['', [Validators.required]],
      servicio: ['', [Validators.required]],
      role: ['', [Validators.required]],
      bloqueado: [''],
    });
  }

  ngOnInit(): void {
    this.getUsuarios();
    this.initSelectValues();
  }

  getUsuarios() {
    this.usuarioService.getUsuariosList().subscribe({
      next: (result) => {
        this.usuariosList = result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getSeverity(idGrupo: number) {
    switch (idGrupo) {
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

  initSelectValues() {
    this.roleService.getRolesList().subscribe((role) => {
      this.rolesList = role ?? [];
    });
    this.grupoService.getGrupoList().subscribe((grupos) => {
      this.gruposList = grupos ?? [];
    });
  }

  onGrupoSelectionChange(selectedValue: any): void {
    this.grupoService.getGrupo(selectedValue.value.id).subscribe((grupo) => {
      this.serviciosList = grupo.servicios;
    });
  }
  // Funciones Crud usuario
  editingUsuario(usuario: UsuarioInterface) {
    this.isEditingUsuario = true;
    this.oldEditUsuario = usuario;
    this.usuarioForm.controls['nombre'].setValue(usuario.nombre);
    this.usuarioForm.controls['apellidos'].setValue(usuario.apellidos);
    this.usuarioForm.controls['dni'].setValue(usuario.dni);
    this.usuarioForm.controls['email'].setValue(usuario.email);
    this.usuarioForm.controls['bloqueado'].setValue(
      usuario.bloqueado ? true : false
    );
    console.log(usuario);
  }

  cancelEditUsuario() {
    this.isEditingUsuario = false;
    this.usuarioForm.reset();
    this.oldEditUsuario = null;
  }

  postUsuario() {
    const usuario: CreateUsuarioInterface = {
      nombre: this.usuarioForm.value.nombre,
      apellidos: this.usuarioForm.value.apellidos,
      dni: this.usuarioForm.value.dni,
      email: this.usuarioForm.value.email,
      roleId: this.usuarioForm.value.role.id,
      grupoId: this.usuarioForm.value.grupo.id,
      serviciosIds: [this.usuarioForm.value.servicio.id],
      bloqueado: this.usuarioForm.value.bloqueado ? true : false,
    };
    console.log(usuario);
    this.usuarioService.createUsuario(usuario).subscribe({
      next: (response) => {
        this.getUsuarios();
        this.cancelEditUsuario();
        this.messageService.add({
          severity: 'success',
          summary: 'Usuario',
          detail: 'Usuario creado correctamente',
        });
        console.log(usuario);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Usuario',
          detail: 'Error al crear el usuario',
        });
      },
    });
  }
  patchUsuario(oldEditUsuario: UsuarioInterface | null) {
    if (oldEditUsuario) {
      const usuario: CreateUsuarioInterface = {
        nombre: this.usuarioForm.value.nombre,
        apellidos: this.usuarioForm.value.apellidos,
        dni: this.usuarioForm.value.dni,
        email: this.usuarioForm.value.email,
        roleId: this.usuarioForm.value.role.id,
        grupoId: this.usuarioForm.value.grupo.id,
        serviciosIds: [this.usuarioForm.value.servicio.id],
        bloqueado: this.usuarioForm.value.bloqueado ? true : false,
      };
      this.usuarioService.patchUsuario(usuario, oldEditUsuario.id).subscribe({
        next: (response) => {
          this.getUsuarios();
          this.cancelEditUsuario();
          this.messageService.add({
            severity: 'success',
            summary: 'Usuario',
            detail: 'Usuario editado correctamente',
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Usuario',
            detail: 'Error al crear el usuario',
          });
        },
      });
    }
  }

  deleteUsuario(event: Event, usuario: UsuarioInterface) {
    let nombreUsuario = usuario.nombre;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Seguro que quieres eliminar el usuario: ${nombreUsuario}`,
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.usuarioService.getUsuario(usuario.id).subscribe({
          next: (response: UsuarioInterface) => {
            this.usuarioService.deleteUsuario(usuario.id).subscribe({
              next: (response) => {
                this.getUsuarios();
                this.messageService.add({
                  severity: 'success',
                  summary: 'Usuario',
                  detail: `Usuario "${nombreUsuario}" eliminado`,
                });
              },
              error: (error) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Usuario',
                  detail: 'Error al eliminar el usuario',
                });
              },
            });
          },
        });
      },
    });
  }
}
