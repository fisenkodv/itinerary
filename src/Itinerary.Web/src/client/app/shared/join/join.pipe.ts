import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join'
})

export class JoinPipe implements PipeTransform {
  transform(value: string[], separator: string): string {
    return value.join(separator);
  }
}
