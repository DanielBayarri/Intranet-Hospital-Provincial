import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TelefonosList } from '../../../assets/telefonos';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-phones',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
  ],
  templateUrl: './phones.component.html',
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
export class PhonesComponent {
  public telefonosList = TelefonosList;

  getSeverity(
    departamento: string
  ):
    | 'success'
    | 'secondary'
    | 'info'
    | 'warning'
    | 'danger'
    | 'contrast'
    | undefined {
    switch (departamento) {
      // Azul claro para departamentos de atención al cliente o servicios básicos
      case 'Información':
      case 'Comunicación':
      case 'Cafetería':
      case 'Dietética':
      case 'Servicios generales':
      case 'Seguridad':
      case 'Sindicatos':
      case 'Odontología - consultas':
        return 'info'; // Azul claro

      // Verde para departamentos de administración, gestión o recursos humanos
      case 'Administración':
      case 'Calidad':
      case 'Gerencia':
      case 'Dirección':
      case 'Prevención de riesgos laborales':
      case 'Servicios jurídicos':
      case 'Recursos humanos':
        return 'success'; // Verde

      // Amarillo para departamentos relacionados con atención médica de seguimiento o procesos críticos no urgentes
      case 'Admisiones':
      case 'Farmacia':
      case 'Medicina legal':
      case 'Medicina deportiva':
      case 'Oncología - consultas':
      case 'Rehabilitación - consultas':
      case 'Rehabilitación - fisioterapia':
      case 'Residencia S.M. Cardenal Costa':
      case 'Unidad de conductas adictivas (UCA)':
      case 'Unidad de hospitalización domiciliaria':
      case 'Psiconcología':
        return 'warning'; // Amarillo

      // Rojo para departamentos de alta prioridad médica y atención inmediata
      case 'Archivo (U.D.C.A.)':
      case 'Braquiterapia':
      case 'Cirugía - consultas':
      case 'Cirugía - planta':
      case 'Cirugía plástica y reconstructiva':
      case 'Medicina nuclear':
      case 'Laboratorios':
      case 'Medicina interna':
      case 'Oncología - planta':
      case 'Oncología RT':
      case 'Urgencias':
      case 'Radiodiagnóstico':
      case 'Unidad de críticos':
      case 'Resonancia magnética':
      case 'Quirófano':
      case 'Urología':
        return 'danger'; // Rojo

      // Gris para departamentos secundarios o administrativos no mencionados explícitamente
      case 'Dirección económica':
      case 'Dirección médica':
        return 'secondary'; // Gris

      case 'Informática':
        return 'contrast'; // Gris
      default:
        return 'info'; // Color por defecto si no se encuentra el departamento
    }
  }
}
