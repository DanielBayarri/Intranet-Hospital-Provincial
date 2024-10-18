import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchService',
  standalone: true,
})
export class SearchServicePipe implements PipeTransform {
  transform(value: any[], searchInput: string) {
    searchInput = searchInput ? searchInput.toLocaleLowerCase() : '';

    return searchInput
      ? value.filter(
          (servicio) =>
            servicio?.nombre?.toLowerCase().includes(searchInput) ||
            servicio?.servicio?.toLowerCase().includes(searchInput)
        )
      : value;
  }
}
