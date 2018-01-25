import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterByBase'
})
export class FilterByBasePipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return value.filter(data => data.baseType === args)
    }

}
