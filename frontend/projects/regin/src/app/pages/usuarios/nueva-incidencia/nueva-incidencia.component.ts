import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BreadcrumbComponent } from '../../../assets/components/breadcrumb/breadcrumb.component';
import { PanelModule } from 'primeng/panel';
import { CommonModule, DatePipe } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TipoInterface } from '../../../../../../shared/interfaces/tipo.interface';
import { UsuarioInterface } from '../../../../../../shared/interfaces/usuario.interface';
import { AuthService } from '../../../../../../host/src/app/auth/auth.service';
import { TipoService } from '../../../core/services/tipo.service';
import { SubtipoInterface } from '../../../../../../shared/interfaces/subtipo.interface';
import { TurnoInterface } from '../../../../../../shared/interfaces/turno.interface';
import { TurnoService } from '../../../core/services/turno.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { FieldsetModule } from 'primeng/fieldset';
import { CrearIncidenciaInterface } from '../../../../../../shared/interfaces/incidencia.interface';
import { IncidenciaService } from '../../../core/services/incidencia.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { GrupoService } from '../../../core/services/grupo.service';
import { GuardiaLocalizadaService } from '../../../core/services/guardias.service';
import { UsuarioService } from '../../../core/services/usuario.service';

@Component({
  selector: 'app-nueva-incidencia',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    PanelModule,
    InputTextareaModule,
    FormsModule,
    RadioButtonModule,
    CalendarModule,
    FieldsetModule,
    ToastModule,
  ],
  providers: [DatePipe, MessageService],
  templateUrl: './nueva-incidencia.component.html',
})
export class NuevaIncidenciaComponent implements OnInit {
  public myForm: FormGroup;
  public guardiasForm: FormGroup;
  public turnosList: TurnoInterface[] = [];
  public tiposList: TipoInterface[] = [];
  public subtiposList: SubtipoInterface[] = [];
  public usuariosList: UsuarioInterface[] = [];
  public currentUser: UsuarioInterface | null = null;
  public fechaHoy: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private messageService: MessageService,
    private incidenciaService: IncidenciaService,
    private grupoService: GrupoService,
    private tipoService: TipoService,
    private authService: AuthService,
    private turnoService: TurnoService,
    private guardiaService: GuardiaLocalizadaService,
    private usuarioService: UsuarioService
  ) {
    this.myForm = this.fb.group({
      titulo: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      subtipo: [''],
      comentario: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
    });

    this.guardiasForm = this.fb.group({
      comentario: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaFin: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
    });
    this.currentUser = this.authService.currentUser();
  }

  ngOnInit(): void {
    this.initSelectValues();
  }

  initSelectValues() {
    this.turnoService.getTurnosList().subscribe((turno) => {
      this.turnosList = turno ?? [];
    });
    if (this.currentUser) {
      let grupoId = this.currentUser.grupo.id;
      this.grupoService.getGrupo(grupoId).subscribe((grupo) => {
        this.tiposList = grupo.tipos;
      });
      this.usuarioService.getUsuariosList().subscribe((usuario) => {
        this.usuariosList = usuario.filter(
          (user) => this.currentUser?.grupo.id === user.grupo.id
        );
      });
    }
  }

  onTipoSelectionChange(selectedValue: any): void {
    this.tipoService.getTipo(selectedValue.value.id).subscribe((tipo) => {
      this.subtiposList = tipo.subtipos;
    });
  }

  validateHoraTurno(horaInicioIncidencia: string) {
    let turnoId = 0;
    this.turnosList.map((turno) => {
      if (
        turno.horaInicio <= horaInicioIncidencia &&
        turno.horaFin >= horaInicioIncidencia
      ) {
        turnoId = turno.id;
      }
      return;
    });
    return turnoId;
  }

  formatFechaHoy() {
    return this.fechaHoy.toLocaleDateString('en-US');
  }

  onSubmit(): void {
    if (this.myForm.valid && this.currentUser) {
      let horaInicio = this.datePipe.transform(
        this.myForm.value.horaInicio,
        'HH:mm:ss',
        'UTC+2'
      );

      let incidencia: CrearIncidenciaInterface = {
        titulo: this.myForm.value.titulo,
        fecha: this.fechaHoy,
        horaInicio: horaInicio
          ? horaInicio
          : this.myForm.value.turno.horaInicio,
        comentario: this.myForm.value.comentario,
        usuarioId: this.currentUser.id,
        grupoId: this.currentUser.grupo.id,
        tipoId: this.myForm.value.tipo.id,
        subtipoId: this.myForm.value.subtipo.id,
        turnoId: this.validateHoraTurno(
          horaInicio ? horaInicio : this.myForm.value.turno.horaInicio
        ),
      };

      this.incidenciaService.createIncidencia(incidencia).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Incidencia',
            detail: 'Incidencia creada correctamente',
          });
          this.myForm.reset();
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Incidencia',
            detail: 'Error al crear la incidencia',
          });
        },
      });
    }
  }

  onSubmitGuardia(): void {
    if (this.guardiasForm.valid && this.currentUser) {
      const horaInicio = this.datePipe.transform(
        this.guardiasForm.value.horaInicio,
        'HH:mm:ss',
        'UTC+2'
      );
      const horaFin = this.datePipe.transform(
        this.guardiasForm.value.horaFin,
        'HH:mm:ss',
        'UTC+2'
      );

      const guardia = {
        fecha: this.fechaHoy,
        horaInicio: horaInicio
          ? horaInicio
          : this.guardiasForm.value.turno.horaInicio,
        horaFin: horaFin ? horaFin : this.guardiasForm.value.turno.horaFin,
        comentario: this.guardiasForm.value.comentario,
        usuarioId: this.guardiasForm.value.usuario.id,
        grupoId: this.currentUser.grupo.id,
      };

      this.guardiaService.createGuardia(guardia).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Guardia Localizada',
            detail: 'Guardia Localizada creada correctamente',
          });
          this.guardiasForm.reset();
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Guardia Localizada',
            detail: 'Error al crear la guardia localizada',
          });
        },
      });
    }
  }
}
