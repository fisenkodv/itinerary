import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {
  public transform(value: string[], separator: string): string {
    return value.join(separator);
  }
}
