import {Component, OnInit} from '@angular/core';
import {WebSocketService} from './services/websocket.service';
import {INotification} from './shared/interface/inotification';
import {environment} from "../environments/environment";

@Component({
  selector: 'space-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private webSocket: WebSocketService) {
      //TODO temporarily disabled until fixed in backend or frontend
      // this.webSocket.connect(environment.webSocketUrl).subscribe( (notification: INotification) => {
      // } );
  }

  ngOnInit(): void {
    // DISABLE DEFAULT PIXI CONSOLE MESSAGE
    PIXI.utils.skipHello();
  }

}
