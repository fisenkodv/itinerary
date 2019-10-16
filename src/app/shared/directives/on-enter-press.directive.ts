import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appOnEnter]'
})
export class OnEnterPressDirective {
  @Output() private enter = new EventEmitter<KeyboardEvent>();

  @HostListener('keypress', ['$event'])
  public onkeypress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.enter.emit(event);
    }
  }
}
