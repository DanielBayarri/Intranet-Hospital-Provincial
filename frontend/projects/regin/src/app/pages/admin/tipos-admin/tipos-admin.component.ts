import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { TipoService } from '../../../core/services/tipo.service';
import { AuthService } from '../../../../../../host/src/app/auth/auth.service';
import { SubtipoService } from '../../../core/services/subtipo.service';
import { UsuarioInterface } from '../../../../../../shared/interfaces/usuario.interface';
import {
  CreateTipoInterface,
  TipoInterface,
} from '../../../../../../shared/interfaces/tipo.interface';
import { GrupoService } from '../../../core/services/grupo.service';
import { BreadcrumbComponent } from '../../../assets/components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { forkJoin } from 'rxjs';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import {
  CreateSubtipoInterface,
  SubtipoInterface,
} from '../../../../../../shared/interfaces/subtipo.interface';

@Component({
  selector: 'app-tipos-admin',
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
  templateUrl: './tipos-admin.component.html',
})
export class TiposAdminComponent implements OnInit {
  public currentUser: UsuarioInterface | null = null;
  public tiposList: TipoInterface[] = [];
  public subtiposList: any[] = [];
  public isLoading: boolean = true;

  public tipoForm: FormGroup;
  public oldEditTipo: TipoInterface | null = null;
  public isEditingTipo: boolean = false;

  public oldEditSubtipo: SubtipoInterface | null = null;
  public subtipoForm: FormGroup;
  public isEditingSubtipo: boolean = false;

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private tipoService: TipoService,
    private subtipoService: SubtipoService,
    private authService: AuthService
  ) {
    this.tipoForm = this.fb.group({
      tipo: ['', [Validators.required, Validators.minLength(1)]],
    });

    this.subtipoForm = this.fb.group({
      subtipo: ['', Validators.required],
      tiposList: ['', [Validators.required]],
    });
    this.currentUser = this.authService.currentUser();
  }

  ngOnInit(): void {
    this.initValuesTable();
  }

  // Inicializar la lista de tipos y subtipos
  initValuesTable() {
    if (this.currentUser) {
      const grupoId = this.currentUser.grupo.id;
      this.tipoService.getTiposList().subscribe((tipos) => {
        this.tiposList = tipos.filter((tipo) => tipo.grupo.id === grupoId);

        this.tiposList.map((tipo) => {
          tipo.subtipos.map((subtipo) => {
            this.subtiposList.push({
              id: subtipo.id,
              nombre: subtipo.nombre,
              tipo: tipo.nombre,
            });
          });
        });
        this.isLoading = false;
      });
    }
  }

  // Funciones tipo
  editingTipo(tipo: TipoInterface) {
    this.isEditingTipo = true;
    this.oldEditTipo = tipo;
    this.tipoForm.controls['tipo'].setValue(tipo.nombre);
  }

  cancelEditTipo() {
    this.isEditingTipo = false;
    this.oldEditTipo = null;
  }

  postTipo() {
    if (this.currentUser) {
      const tipo: CreateTipoInterface = {
        nombre: this.tipoForm.value.tipo,
        grupoId: this.currentUser.grupo.id,
      };
      this.tipoService.createTipo(tipo).subscribe({
        next: (response) => {
          this.isLoading = true;
          this.subtiposList = [];
          this.initValuesTable();
          this.tipoForm.reset();

          this.messageService.add({
            severity: 'success',
            summary: 'Tipo',
            detail: 'Tipo creado correctamente',
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
  patchTipo(oldEditTipo: TipoInterface | null) {
    if (this.currentUser && oldEditTipo) {
      const tipo: CreateTipoInterface = {
        nombre: this.tipoForm.value.tipo,
        grupoId: this.currentUser.grupo.id,
      };
      this.tipoService.patchTipo(tipo, oldEditTipo.id).subscribe({
        next: (response) => {
          this.isLoading = true;
          this.subtiposList = [];
          this.initValuesTable();

          this.cancelEditTipo();
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

  deleteTipo(event: Event, tipo: TipoInterface) {
    let nombreTipo = tipo.nombre;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Seguro que quieres eliminar el tipo: ${nombreTipo}`,
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.tipoService.getTipo(tipo.id).subscribe({
          next: (response: TipoInterface) => {
            if (response.subtipos.length === 0) {
              this.tipoService.deleteTipo(tipo.id).subscribe({
                next: (response) => {
                  this.isLoading = true;
                  this.subtiposList = [];
                  this.initValuesTable();
                  this.cancelEditTipo();
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Tipo',
                    detail: `Tipo "${nombreTipo}" eliminado`,
                  });
                },
                error: (error) => {
                  this.messageService.add({
                    severity: 'error',
                    summary: `Tipo "${nombreTipo}"`,
                    detail: error.error.message,
                  });
                },
              });
            } else {
              this.messageService.add({
                severity: 'info',
                summary: 'Tipo',
                detail: `No puedes eliminar "${tipo.nombre}", tiene subtipos asociados`,
              });
            }
          },
        });
      },
    });
  }

  // Funciones Subtipo

  editingSubtipo(subtipo: SubtipoInterface) {
    this.isEditingSubtipo = true;
    this.oldEditSubtipo = subtipo;
    this.subtipoForm.controls['subtipo'].setValue(subtipo.nombre);
    this.subtipoForm.controls['tipoList'].setValue(subtipo.tipo);
  }

  cancelEditSubtipo() {
    this.isEditingSubtipo = false;
    this.subtipoForm.reset();
    this.oldEditSubtipo = null;
  }

  postSubipo() {
    if (this.currentUser) {
      const subtipo: CreateSubtipoInterface = {
        nombre: this.subtipoForm.value.subtipo,
        tipoId: this.subtipoForm.value.tiposList.id,
      };
      this.subtipoService.createSubtipo(subtipo).subscribe({
        next: (response) => {
          this.isLoading = true;
          this.subtiposList = [];
          this.initValuesTable();
          this.cancelEditSubtipo();
          this.messageService.add({
            severity: 'success',
            summary: 'Subtipo',
            detail: 'Subtipo creado correctamente',
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Subtipo',
            detail: 'Error al crear el subtipo',
          });
        },
      });
    }
  }

  patchSubtipo(oldEditSubtipo: SubtipoInterface | null) {
    if (this.currentUser && oldEditSubtipo) {
      const subtipo: CreateSubtipoInterface = {
        nombre: this.subtipoForm.value.subtipo,
        tipoId: this.subtipoForm.value.tiposList.id,
      };

      this.subtipoService.patchSubtipo(subtipo, oldEditSubtipo.id).subscribe({
        next: (response) => {
          this.isLoading = true;
          this.subtiposList = [];
          this.initValuesTable();
          this.cancelEditSubtipo();
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

  deleteSubtipo(event: Event, subtipo: SubtipoInterface) {
    const nombreSubtipo = subtipo.nombre;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Seguro que quieres eliminar el subtipo: ${nombreSubtipo}`,
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.subtipoService.deleteSubtipo(subtipo.id).subscribe({
          next: (response) => {
            this.isLoading = true;
            this.subtiposList = [];
            this.cancelEditSubtipo();
            this.initValuesTable();
            this.messageService.add({
              severity: 'success',
              summary: 'Subtipo',
              detail: `Subtipo "${nombreSubtipo}" eliminado`,
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: `Subtipo ${nombreSubtipo}`,
              detail: error.error.message,
            });
          },
        });
      },
    });
  }
}
