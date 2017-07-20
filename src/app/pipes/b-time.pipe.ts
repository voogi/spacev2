import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bTime'
})
export class BTimePipe implements PipeTransform {

    getDuration = function(millis){
        const dur = {};
        const units = [
            {label: 'millis',    mod: 1000},
            {label: 'seconds',   mod: 60},
            {label: 'minutes',   mod: 60},
            {label: 'hours',     mod: 24},
            {label: 'days',      mod: 31}
        ];
        // calculate the individual unit values...
        units.forEach(function(u){
            millis = (millis - (dur[u.label] = (millis % u.mod))) / u.mod;
        });
        // convert object to a string representation...
        const nonZero = function(u){ return dur[u.label]; };
        dur.toString = function(){
            return units
                .reverse()
                .filter(nonZero)
                .map(function(u){
                    return dur[u.label] + ' ' + (dur[u.label] === 1 ? u.label.slice(0, -1) : u.label);
                })
                .join(', ');
        };
        return dur;
    };

  transform(value: any, args?: any): any {
      return this.getDuration(value);
  }

}
