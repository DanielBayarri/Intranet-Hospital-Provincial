import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../../assets/components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import {
  Form,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  CreateGrupoInterface,
  GrupoInterface,
  GrupoListInterface,
} from '../../../../../../shared/interfaces/grupo.interface';
import {
  CreateServicioInterface,
  ServicioInterface,
} from '../../../../../../shared/interfaces/servicio.interface';
import { GrupoService } from '../../../core/services/grupo.service';
import { ServicioService } from '../../../core/services/servicio.service';
import { AuthService } from '../../../../../../host/src/app/auth/auth.service';
import { UsuarioInterface } from '../../../../../../shared/interfaces/usuario.interface';

@Component({
  selector: 'app-grupos-servicios-super',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    TableModule,
    TooltipModule,
    ButtonModule,
    PanelModule,
    InputTextModule,
    DropdownModule,
    ReactiveFormsModule,
    ToastModule,
    ConfirmPopupModule,
  ],
  providers: [ConfirmationService, MessageService],

  templateUrl: './grupos-servicios-super.component.html',
})
export class GruposServiciosSuperComponent implements OnInit {
  public currentUser: UsuarioInterface | null = null;
  public gruposList: GrupoListInterface[] = [];
  public serviciosList: ServicioInterface[] = [];
  public isLoading: boolean = true;

  public grupoId: number = 0;
  public grupoForm: FormGroup;
  public oldEditGrupo: GrupoInterface | null = null;
  public isEditingGrupo: boolean = false;

  public servicioForm: FormGroup;
  public oldEditServicio: ServicioInterface | null = null;
  public isEditingServicio: boolean = false;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private grupoService: GrupoService,
    private servicioService: ServicioService,
    private authService: AuthService
  ) {
    this.grupoForm = this.fb.group({
      grupo: ['', [Validators.required, Validators.minLength(1)]],
    });

    this.servicioForm = this.fb.group({
      servicio: ['', Validators.required],
      gruposList: ['', [Validators.required]],
    });

    this.currentUser = this.authService.currentUser();
  }

  ngOnInit(): void {
    if (this.currentUser) this.grupoId = this.currentUser.grupo.id;

    this.initValues();
  }

  initValues() {
    this.grupoService
      .getGrupoList()
      .subscribe((grupo) => (this.gruposList = grupo));

    this.servicioService.getServiciosList().subscribe((servicios) => {
      this.serviciosList = servicios.filter(
        (ser) => ser.grupo.id === this.grupoId
      );
      this.isLoading = false;
    });
  }

  onGrupoSelectionChange(selectedValue: any): void {
    this.grupoId = selectedValue.value.id;
    this.isLoading = true;
    this.serviciosList = [];
    this.initValues();
  }

  // Funciones grupo
  editingGrupo(grupo: GrupoInterface) {
    this.isEditingGrupo = true;
    this.oldEditGrupo = grupo;
    this.grupoForm.controls['grupo'].setValue(grupo.nombre);
  }

  cancelEditGrupo() {
    this.isEditingGrupo = false;
    this.grupoForm.reset();
    this.oldEditGrupo = null;
  }

  postGrupo() {
    if (this.currentUser) {
      const grupo: CreateGrupoInterface = {
        nombre: this.grupoForm.value.grupo,
      };
      this.grupoService.createGrupo(grupo).subscribe({
        next: (response) => {
          this.isLoading = true;
          this.serviciosList = [];
          this.initValues();
          this.grupoForm.reset();

          this.messageService.add({
            severity: 'success',
            summary: 'Grupo',
            detail: 'Grupo creado correctamente',
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Grupo',
            detail: 'Error al crear el grupo',
          });
        },
      });
    }
  }
  patchGrupo(oldEditGrupo: GrupoInterface | null) {
    if (this.currentUser && oldEditGrupo) {
      const grupo: CreateGrupoInterface = {
        nombre: this.grupoForm.value.grupo,
      };
      this.grupoService.patchGrupo(grupo, oldEditGrupo.id).subscribe({
        next: (response) => {
          this.isLoading = true;
          this.serviciosList = [];
          this.initValues();
          this.cancelEditGrupo();
          this.messageService.add({
            severity: 'success',
            summary: 'Grupo',
            detail: 'Grupo editado correctamente',
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Grupo',
            detail: 'Error al crear el grupo',
          });
        },
      });
    }
  }

  deleteGrupo(event: Event, grupo: GrupoInterface) {
    let nombreGrupo = grupo.nombre;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Seguro que quieres eliminar el grupo: ${nombreGrupo}`,
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.grupoService.getGrupo(grupo.id).subscribe({
          next: (response: GrupoInterface) => {
            if (response.servicios.length === 0) {
              this.grupoService.deleteGrupo(grupo.id).subscribe({
                next: (response) => {
                  this.isLoading = true;
                  this.serviciosList = [];
                  this.initValues();
                  this.cancelEditGrupo();
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Grupo',
                    detail: `Grupo "${nombreGrupo}" eliminado`,
                  });
                },
                error: (error) => {
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Grupo',
                    detail: 'Error al eliminar el grupo',
                  });
                },
              });
            } else {
              this.messageService.add({
                severity: 'info',
                summary: 'Grupo',
                detail: `No puedes eliminar "${grupo.nombre}", tiene servicios asociados`,
              });
            }
          },
        });
      },
    });
  }

  // Funciones Servicio

  editingServicio(servicio: ServicioInterface) {
    this.isEditingServicio = true;
    this.oldEditServicio = servicio;
    this.servicioForm.controls['servicio'].setValue(servicio.nombre);
    this.servicioForm.controls['gruposList'].setValue(servicio.grupo.id);
  }

  cancelEditServicio() {
    this.isEditingServicio = false;
    this.servicioForm.reset();
    this.oldEditServicio = null;
  }

  postServicio() {
    if (this.currentUser) {
      const servicio: CreateServicioInterface = {
        nombre: this.servicioForm.value.servicio,
        grupoId: this.servicioForm.value.gruposList.id,
      };
      this.servicioService.createServicio(servicio).subscribe({
        next: (response) => {
          this.isLoading = true;
          this.serviciosList = [];
          this.initValues();
          this.cancelEditServicio();
          this.messageService.add({
            severity: 'success',
            summary: 'Servicio',
            detail: 'Servicio creado correctamente',
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Servicio',
            detail: 'Error al crear el servicio',
          });
        },
      });
    }
  }

  patchServicio(oldEditServicio: ServicioInterface | null) {
    if (this.currentUser && oldEditServicio) {
      const servicio: CreateServicioInterface = {
        nombre: this.servicioForm.value.servicio,
        grupoId: this.servicioForm.value.gruposList.id,
      };
      console.log(servicio);

      this.servicioService
        .patchServicio(servicio, oldEditServicio.id)
        .subscribe({
          next: (response) => {
            this.isLoading = true;
            this.serviciosList = [];
            this.initValues();
            this.cancelEditServicio();
            this.messageService.add({
              severity: 'success',
              summary: 'Tipo',
              detail: 'Tipo editado correctamente',
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Tipo',
              detail: 'Error al crear el tipo',
            });
          },
        });
    }
  }

  deleteServicio(event: Event, servicio: ServicioInterface) {
    const nombreServicio = servicio.nombre;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Seguro que quieres eliminar el servicio: ${nombreServicio}`,
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.servicioService.deleteServicio(servicio.id).subscribe({
          next: (response) => {
            this.isLoading = true;
            this.serviciosList = [];
            this.initValues();
            this.cancelEditServicio();
            this.messageService.add({
              severity: 'success',
              summary: 'Servicio',
              detail: `Servicio "${nombreServicio}" eliminado`,
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Servicio',
              detail: 'Error al eliminar el servicio',
            });
          },
        });
      },
    });
  }
}
