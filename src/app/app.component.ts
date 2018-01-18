import {Component, OnInit} from '@angular/core';
import {WebSocketService} from './services/websocket.service';
import {INotification} from './shared/interface/inotification';

@Component({
  selector: 'space-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private webSocket: WebSocketService) {
    const webSocketUrl: string = 'ws://localhost:8080/notification';
    this.webSocket.connect(webSocketUrl).subscribe( (notification: INotification) => {
    } );
  }

  ngOnInit(): void {
    // DISABLE DEFAULT PIXI CONSOLE MESSAGE
    PIXI.utils.skipHello();
  }

}
