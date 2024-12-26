import { animate, style, transition, trigger } from '@angular/animations';

export const EnterAnimation = trigger('enterAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.5s', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('0.5s', style({ opacity: 0 })),
  ]),
]);

export const ListItemAnimation = trigger('listItemAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-20px)' }),
    animate('0.2s', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
  transition(':leave', [
    style({ opacity: 1, transform: 'translateY(0)' }),
    animate('0.2s', style({ opacity: 0, transform: 'translateY(-20px)' })),
  ]),
]);
