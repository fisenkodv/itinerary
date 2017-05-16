import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  Component,
  Input
} from '@angular/core';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('100ms ease-in')
  ]),
  transition(':leave', animate('100ms ease-out', style({ opacity: 0 })))
]);
