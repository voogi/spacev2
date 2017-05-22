import { Component, OnInit } from '@angular/core';
import {fadeInAnimation} from "../animations/slide-in-out.animation";

@Component({
  selector: 'space-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.css']/*,
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }*/
})
export class SpaceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
