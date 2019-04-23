import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SearchPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], terms: string): any[] {
    if (!items) return [];
    if (!terms) return items;
    terms = terms.toLowerCase();
    return items.filter(it => {
      return (it["Name"] !== undefined && it["Name"].toString().toLowerCase().includes(terms)) ||
        (it["Code"] !== undefined && it["Code"].toString().toLowerCase().includes(terms)) ||
        (it["Description"] !== undefined && it["Description"].toString().toLowerCase().includes(terms));
    });
  }
}
