import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSliderModule,
  MatToolbarModule,
  MatTooltipModule,
  MatSidenavModule,
  MatListModule
} from '@angular/material';

export const MODULES = [
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSliderModule,
  MatToolbarModule,
  MatListModule,
  MatTooltipModule,
  MatSidenavModule
];

@NgModule({
  imports: MODULES,
  declarations: [],
  exports: MODULES
})
export class MaterialModule {}
