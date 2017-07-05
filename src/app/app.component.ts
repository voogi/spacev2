import {Component, OnInit} from '@angular/core';
import {WebSocketService} from './services/websocket.service';
import {INotification} from './shared/interface/inotification';
import {NotificationsService} from 'angular2-notifications/dist';

@Component({
  selector: 'space-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private webSocket: WebSocketService, private notificationService: NotificationsService) {
    const webSocketUrl: string = 'ws://localhost:8080/notification';
    this.webSocket.connect(webSocketUrl).subscribe( (notification: INotification) => {
      this.notificationService.info('KÉSZ');
    } );
  }

  ngOnInit(): void {
    PIXI.utils.skipHello();
  }

}
