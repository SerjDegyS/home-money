import {animate, style, transition, trigger} from '@angular/animations';

export const fadeStateTrigger = trigger('fade', [
  transition(':enter', [
    style({
      opacity: 0
    }),
    animate(300)
  ]),
  transition(':leave', [
    animate(500),
    style({
      opacity: 0
  })])
]);
