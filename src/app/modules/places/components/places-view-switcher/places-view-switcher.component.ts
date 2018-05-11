import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ViewMode } from '../../state/places.state';

@Component({
  selector: 'app-places-view-switcher',
  templateUrl: './places-view-switcher.component.html',
  styleUrls: ['./places-view-switcher.component.scss']
})
export class PlacesViewSwitcherComponent {
  @Input() viewMode: ViewMode;
  @Output() viewModeChange: EventEmitter<ViewMode> = new EventEmitter<ViewMode>();

  public toggleViewMode() {
    this.viewModeChange.emit(this.viewMode === ViewMode.list ? ViewMode.map : ViewMode.list);
  }
}
