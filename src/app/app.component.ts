import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnim', [
      // when we increment tab we move in a direction, if decrementing we inverse
      transition(':increment', [
        style({
          position: 'relative',
        }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            overflow: 'hidden',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }),
        ], { optional: true }),
        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'translateX(-50px)'
            })) 
          ], { optional: true }),
          query(':enter', [
            style({
              opacity: 0,
              transform: 'translateX(50px)'
            }),
            animate('200ms 120ms ease-out', style({
              opacity: 1,
              transform: 'translateX(0)'
            })) 
          ], { optional: true })
        ])

      ]),

      // DECREMENT TRANSITION
      transition(':decrement', [
        style({
          position: 'relative',
        }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden'
          }),
        ], { optional: true }),

        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'translateX(50px)'
            })) 
          ], { optional: true }),
          query(':enter', [
            style({
              opacity: 0,
              transform: 'translateX(-50px)'
            }),
            animate('200ms 120ms ease-out' , style({
              opacity: 1,
              transform: 'translateX(0)'
            })) 
          ], { optional: true })
        ])

      ])
    ])
  ]
})
export class AppComponent {

  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData['tab']
  }

}
