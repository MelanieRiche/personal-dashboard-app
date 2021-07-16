import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { notificationData } from '../shared/notification-data.model';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('notificationAnim', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(10px)'
        }),
        animate('150ms 125ms ease-out')
      ]),
      transition(':leave', [
        animate(150, style({
          opacity: 0,
          transform: 'scale(0.85)'
        }))
      ])
    ])
  ]
})
export class NotificationComponent implements OnInit {

  notification!: notificationData[]

  timeout!: any


  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.notifications.subscribe((notification: notificationData) => {
      this.notification = Array(notification)

      clearTimeout(this.timeout)

      this.timeout = setTimeout(() => {
        this.notification = null!
      }, notification.duration)
    })
  } 

}
