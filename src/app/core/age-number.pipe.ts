import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ageNumber'
})
export class AgeNumberPipe implements PipeTransform {

  transform(value: string): number {
    // tslint:disable-next-line: radix
    const age = 2020 - parseInt(value.split('-')[0])
    return age
  }

}
