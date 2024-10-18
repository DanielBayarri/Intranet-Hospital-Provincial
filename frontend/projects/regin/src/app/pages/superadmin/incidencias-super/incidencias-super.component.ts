import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { IncidenciaInterface } from '../../../../../../shared/interfaces/incidencia.interface';
import { IncidenciaService } from '../../../core/services/incidencia.service';
import { BreadcrumbComponent } from '../../../assets/components/breadcrumb/breadcrumb.component';
import { Table, TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CalendarComponent } from '../../../assets/components/calendar/calendar.component';
import { PdfService } from '../../../core/pdf/pdf.service';

@Component({
  selector: 'app-incidencias-super',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    TableModule,
    IconFieldModule,
    InputIconModule,
    TagModule,
    CommonModule,
    CalendarComponent,
    ButtonModule,
  ],
  templateUrl: './incidencias-super.component.html',
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
export class IncidenciasSuperComponent {
  public incidenciasList: IncidenciaInterface[] = [];
  public fecha: Date[] = [];
  public comentariosExpandidos: Set<number> = new Set<number>();
  @ViewChild('dt2') dt2!: Table;

  size: string = 'p-datatable-sm p-datatable-striped';

  constructor(
    private incidenciaService: IncidenciaService,
    private pdfService: PdfService
  ) {}

  ngOnInit(): void {
    this.getIncidencias();
  }

  getIncidencias(fechaRango?: boolean) {
    this.incidenciaService.getIncidenciasList().subscribe({
      next: (result) => {
        if (fechaRango && this.fecha.length === 2) {
          const [startDate, endDate] = this.fecha;

          // Fecha filtra hasta las 23:59
          const endOfDay = new Date(endDate);
          endOfDay.setHours(23, 59, 59, 999);

          this.incidenciasList = result.filter((incidencia) => {
            const incidenciaDate = new Date(incidencia.fecha);
            return incidenciaDate >= startDate && incidenciaDate <= endOfDay;
          });
        } else {
          this.incidenciasList = result;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onDateChanged(dates: Date[]) {
    this.fecha = dates;
    this.getIncidencias(true);
  }

  clearDate() {
    this.getIncidencias();
    this.fecha = [];
  }
  mostrarComentarioCompleto(id: number) {
    if (this.comentariosExpandidos.has(id)) {
      this.comentariosExpandidos.delete(id); // Si está expandido, lo contrae
    } else {
      this.comentariosExpandidos.add(id); // Si está contraído, lo expande
    }
  }

  isComentarioExpandido(id: number): boolean {
    return this.comentariosExpandidos.has(id);
  }

  generarPDF() {
    const filteredRows = this.dt2.filteredValue || this.incidenciasList;

    let textoFechas = 'Todas las incidencias';
    if (this.fecha.length === 2) {
      const [startDate, endDate] = this.fecha;
      textoFechas = `Incidencias del ${startDate.toLocaleDateString(
        'es-ES'
      )} al ${endDate.toLocaleDateString('es-ES')}`;
    }

    this.pdfService.generateIncidenciasPDF(filteredRows, textoFechas);
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
}
