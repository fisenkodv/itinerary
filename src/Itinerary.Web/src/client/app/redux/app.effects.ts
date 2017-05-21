import { EffectsModule } from '@ngrx/effects';

import { FilterEffects } from '../places/redux/places/places.effects';

export const Effects = [
  EffectsModule.run(FilterEffects)
];

//export * from '../places/redux/effects/filter';
