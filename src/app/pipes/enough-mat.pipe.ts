import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enoughMat'
})
export class EnoughMatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value;
  }

}
