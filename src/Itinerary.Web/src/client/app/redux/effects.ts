import { EffectsModule } from '@ngrx/effects';

import { FilterEffects } from '../places/redux/effects/filter';

export const Effects = [
  EffectsModule.run(FilterEffects)
];

export * from '../places/redux/effects/filter';
