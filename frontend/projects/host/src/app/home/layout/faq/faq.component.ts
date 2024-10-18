import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PrimaryBarComponent } from '../../components/primary-bar/primary-bar.component';
import { faqList, faqListInterface } from './faq-list';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [],
  templateUrl: './faq.component.html',
})
export class FaqComponent {
  faqList: faqListInterface[] = faqList;
  dropdowns: { [key: string]: boolean } = {};

  toggleDropdown(faq: number) {
    this.dropdowns[faq] = !this.dropdowns[faq];
  }
}
