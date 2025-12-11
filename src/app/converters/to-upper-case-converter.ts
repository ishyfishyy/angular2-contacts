import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toUpperCase',
  standalone: true
})
export class ToUpperCasePipe implements PipeTransform {
  transform(value: any): any {
    return value ? value.toUpperCase() : value;
  }
}
