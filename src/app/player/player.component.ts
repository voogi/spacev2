import { Component, OnInit } from '@angular/core';
import {fadeInAnimation} from "../animations/slide-in-out.animation";

@Component({
  selector: 'space-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']/*,
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }*/
})
export class PlayerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
