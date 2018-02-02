import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[onEnter]'
})
export class OnEnterPressDirective {

  @Output()
  private onEnter = new EventEmitter<KeyboardEvent>();

  @HostListener('keypress', ['$event'])
  public onkeypress(event: KeyboardEvent) {
    if (event.which === 13) {
      this.onEnter.emit(event);
    }
  }
}
