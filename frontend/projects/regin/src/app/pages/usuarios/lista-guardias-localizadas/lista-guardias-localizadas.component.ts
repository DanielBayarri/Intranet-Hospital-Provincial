import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { BreadcrumbComponent } from '../../../assets/components/breadcrumb/breadcrumb.component';
import { Table, TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CalendarComponent } from '../../../assets/components/calendar/calendar.component';
import { ButtonModule } from 'primeng/button';
import { UsuarioInterface } from '../../../../../../shared/interfaces/usuario.interface';
import { AuthService } from '../../../../../../host/src/app/auth/auth.service';
import { PdfService } from '../../../core/pdf/pdf.service';
import { GuardiaLocalizadaInterface } from '../../../../../../shared/interfaces/guardia.interface';
import { GuardiaLocalizadaService } from '../../../core/services/guardias.service';

@Component({
  selector: 'app-lista-guardias-localizadas',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    CommonModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    CalendarComponent,
    ButtonModule,
  ],
  templateUrl: './lista-guardias-localizadas.component.html',
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
export class ListaGuardiasLocalizadasComponent {
  public guardiasList: GuardiaLocalizadaInterface[] = [];
  public currentUser: UsuarioInterface | null = null;
  public fecha: Date[] = [];
  public comentariosExpandidos: Set<number> = new Set<number>(); // Para los comentarios largos

  size: string = 'p-datatable-sm p-datatable-striped';
  @ViewChild('dt2') dt2!: Table;

  constructor(
    private guardiaService: GuardiaLocalizadaService,
    private authService: AuthService,
    private pdfService: PdfService
  ) {
    this.currentUser = this.authService.currentUser();
  }

  ngOnInit(): void {
    this.getGuardias();
  }

  getGuardias(fechaRango?: boolean) {
    if (this.currentUser) {
      const userId = this.currentUser.id;
      this.guardiaService.getGuardiasList().subscribe({
        next: (result) => {
          if (fechaRango && this.fecha.length === 2) {
            const [startDate, endDate] = this.fecha;

            // Fecha filtra hasta las 23:59
            const endOfDay = new Date(endDate);
            endOfDay.setHours(23, 59, 59, 999);

            this.guardiasList = result.filter((guardia) => {
              const incidenciaDate = new Date(guardia.fecha);
              return (
                guardia.usuario.id === userId &&
                incidenciaDate >= startDate &&
                incidenciaDate <= endOfDay
              );
            });
          } else {
            this.guardiasList = result.filter(
              (guardia) => guardia.usuario.id === userId
            );
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  onDateChanged(dates: Date[]) {
    this.fecha = dates;
    this.getGuardias(true);
  }

  clearDate() {
    this.getGuardias();
    this.fecha = [];
  }

  mostrarComentarioCompleto(id: number) {
    if (this.comentariosExpandidos.has(id)) {
      this.comentariosExpandidos.delete(id);
    } else {
      this.comentariosExpandidos.add(id);
    }
  }

  isComentarioExpandido(id: number): boolean {
    return this.comentariosExpandidos.has(id);
  }

  generarPDF() {
    const filteredRows = this.dt2.filteredValue || this.guardiasList;

    let textoFechas = 'Todas las incidencias';
    if (this.fecha.length === 2) {
      const [startDate, endDate] = this.fecha;
      textoFechas = `Incidencias del ${startDate.toLocaleDateString(
        'es-ES'
      )} al ${endDate.toLocaleDateString('es-ES')}`;
    }

    this.pdfService.generateGuardiasPDF(filteredRows, textoFechas);
  }
}
