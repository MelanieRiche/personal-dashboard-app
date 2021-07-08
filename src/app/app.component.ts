import { animate, query, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnim', [
      transition('* => *', [
        query(':enter', [
          style({
            background: 'wheat',
            display: 'block',
            height: '100%'
          }),
          animate(1000, style({
            background: '*',
            height: 'auto'
          }))
        ], { optional: true }),

        style({
          background: 'blue'
        }),
        animate(1000)
      ])
    ])
  ]
})
export class AppComponent {

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.snapshot && outlet.activatedRouteData.snapshot.url;
  }

}
