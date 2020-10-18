import {Pipe, PipeTransform} from '@angular/core';
import {DegysEvent} from '../models/event.model';

@Pipe({
  name: 'degysFilterEvents'
})
export class FilterEventsPipe implements PipeTransform {
  transform(items: DegysEvent[], value: string, field: string): DegysEvent[] {
    if (items.length === 0 || !value) {
      return items;
    }

    return items.filter( (i) => {

      // copy events properties to target object
      const t = Object.assign({}, i);

      // cast number to string
      t[field] += '';

      // cast full date to short (DD.MM.YYYY)
      if (field === 'date') {
        t[field] = t[field].slice(0, 10);
      }

      // cast income and outcome to russian language
      if (field === 'type') {
        t[field] = t[field] === 'income' ? 'доход' : 'расход';
      }

      // cat category id to category name
      if ( field === 'category' ) {
        field = 'catName';
      }

      return t[field].toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }

}
