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

  backgrounds: string[] = [
    'https://images.unsplash.com/photo-1623275564123-99c00b15e392?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYyNTY0OTQxMA&ixlib=rb-1.2.1&q=80&w=1920'
  ]
  loadingBGImage!: boolean

  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData['tab']
  }

  async changeBGImage() {
    this.loadingBGImage = true
    // alert("i want to change bg img")
    // request from unplash with fetch
    const result = await fetch('https://source.unsplash.com/random/1920x1080', {
      method: 'HEAD' // to get data without downloading the img
    })
    
    const alreadyGot = this.backgrounds.includes(result.url)
    if (alreadyGot) {
      // this is the same image as we currently have, so re-run the function
      this.changeBGImage()
    }

    this.backgrounds.push(result.url)
  }

  onBGImageLoad(imgEvent: Event) {
    // BG image has loaded, now remove the old BG image from the backgrounds array
    const imgElement = imgEvent.target as HTMLImageElement
    // console.log(imgElement)
    const src = imgElement.src
    // console.log(src)
    this.backgrounds = this.backgrounds.filter(b => b === src) // we only keep the b that is the same as the source that just loaded
    // this.backgrounds = [src] ---- FIY: this line is doing the same as the precedent one

    this.loadingBGImage = false
  }

}
