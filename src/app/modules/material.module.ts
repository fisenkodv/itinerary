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
  MatListModule,
  MatProgressSpinnerModule
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
  MatSidenavModule,
  MatProgressSpinnerModule
];

@NgModule({
  imports: MODULES,
  declarations: [],
  exports: MODULES
})
export class MaterialModule {}
