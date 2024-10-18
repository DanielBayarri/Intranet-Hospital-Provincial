import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchName',
  standalone: true,
})
export class SearchAppPipe implements PipeTransform {
  transform(value: any[], searchInput: string) {
    searchInput = searchInput ? searchInput.toLocaleLowerCase() : '';

    return searchInput
      ? value.filter((nombre) =>
          nombre?.nombre?.toLowerCase().includes(searchInput)
        )
      : value;
  }
}
