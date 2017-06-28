import { animate, state, style, transition, trigger } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('100ms ease-in', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('100ms ease-out', style({ opacity: 0 }))
  ])
]);
