import {
  AfterViewInit, Component, ElementRef, OnInit
} from '@angular/core';

import * as PIXI from 'pixi.js/dist/pixi.js';
import * as $ from 'jquery';

@Component({
  selector: 'space-skill-tree',
  templateUrl: './skill-tree.component.html',
  styleUrls: ['./skill-tree.component.css']
})
export class SkillTreeComponent implements OnInit, AfterViewInit {

  private renderer: any;
  private skillTree: any = {};

  constructor(private elementRef: ElementRef) {
    this.skillTree = {
      ship : {
        root : {
          text : "SHIPS"
        },
        circle_1 : [
          {
            text: "asd",
            type: "type",
            color : "red"
          }
        ],
        circle_2 : [
          {
            text: "asd",
            type: "type",
            color : "red"
          }
        ]
      }
    }
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

    this.renderer = PIXI.autoDetectRenderer(1000, 400);

    this.elementRef.nativeElement.children[0].appendChild(this.renderer.view);

    let stage = new PIXI.Container();

    let root = new PIXI.Graphics();

    root.lineStyle(0);
    root.beginFill(0xFFFF0B, 0.5);
    root.drawCircle(500,200,30);
    root.endFill();
    root.interactive = true;
    root.buttonMode = true;
    root.on("pointerover", function(){
      root.x *= 1.25;
      root.y *= 1.25;
    });

    stage.addChild(root);

    this.renderer.render(stage);
  }

}
