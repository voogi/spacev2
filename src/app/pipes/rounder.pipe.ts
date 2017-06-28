import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rounder'
})
export class RounderPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return Math.round(value);
  }

}
