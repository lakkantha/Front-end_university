import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param {any[]} items
   * @param {string} boxValue
   * 
   * @returns {any[]}
   */
  transform(items: any[], boxValue: string): any[] {
    if (!items) {
      return [];
    }
    if (!boxValue) {
      return items;
    }
    boxValue = boxValue.toLocaleLowerCase();

    return items.filter(it => {
      return it.toLocaleLowerCase().includes(boxValue);
    });
  }
}