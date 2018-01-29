import { Component, ElementRef, HostBinding, HostListener, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ResourceLoaderService} from '../../services/resource-loader.service';
import {fadeInAnimation} from '../../animations/slide-in-out.animation';

import {BackendService} from '../../services/backend.service';
import {ISystem} from '../../shared/interface/isystem';
import {Log, Level} from 'ng2-logger';
import { AssetsService } from "../../services/assets.service";
import { IAsset } from "../../shared/interface/graphics/iasset";
import { Context } from "../../shared/interface/graphics/context";

declare var p: p5;

@Component({
  selector: 'space-starmapv2',
  templateUrl: './starmapv2.component.html',
  styles: [`
    #kanvas {
      width: 100%;
      height: 100%;
      margin: -15px;
    }
  `],
  animations: [fadeInAnimation]
})
export class StarmapComponentV2 implements OnInit {

  private log = Log.create('starmapv2', Level.ERROR, Level.WARN, Level.INFO);

  @HostBinding('@fadeInAnimation')
  get fadeInAnimation() {
    return '@fadeInAnimation';
  }

  private context: Context = new Context();
  private p: p5;

  private systemAssets: Array<IAsset> = [];

  private isDragging: boolean = false;
  private dragStartX: number = 0;
  private dragStartY: number = 0;
  private dragDeltaX: number = 0;
  private dragDeltaY: number = 0;
  private lastDeltaX: number = 0;
  private lastDeltaY: number = 0;

  constructor(private elementRef: ElementRef,
              private router: Router,
              private resourceLoader: ResourceLoaderService,
              private backendService: BackendService,
              private assetsService: AssetsService) {
  }

  ngOnInit() {
    this.log.color = 'red';
    this.log.info('ngOnInit', 'completed');
    // this.resourceLoader.loadResources(this.initStarMap.bind(this));

    this.initStarMap();
  }

  initStarMap() {
    let self = this;

    let s = (p: p5) => {

      p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);

        p.imageMode(p.CENTER);
        p.angleMode(p.DEGREES);

        self.context.size.x = p.windowWidth;
        self.context.size.y = p.windowHeight;

        self.assetsService.setP5(p);

        // self.backendService.getDiscoveredSystemByUser('3f22ac02-243a-46d3-a0ff-cb6284f1f97e')
        //   .subscribe((systems: Array<ISystem>) => {
        //     for(let i = 0; i < systems.length; i++) {
        //       self.systemAssets.push(self.assetsService.system(systems[i]));
        //     }
        //   });

        self.backendService.getSolarSystem()
          .subscribe((systems: Array<ISystem>) => {
            for(let i = 0; i < systems.length; i++) {
              self.systemAssets.push(self.assetsService.system(systems[i]));
            }
          });
      };

      p.draw = function() {
        p.clear();

        self.context.position.x += self.context.velocity.x;
        self.context.position.y += self.context.velocity.y;

        p.push();
        p.scale(self.context.scale);
        p.translate(self.context.position.x, self.context.position.y);

        // Draw systems
        let drawn = 0;
        for(let i = 0; i < self.systemAssets.length; i++) {
          if (i == self.systemAssets.length - 2) {
            self.systemAssets[i].debugDraw(self.context, p);
          }
          if(self.systemAssets[i].draw(self.context, p)) {
            drawn++;
          }
          // p.push();
          // p.resetMatrix();
          // if(i == 0) {
          //   p.fill(p.color(255));
          //   p.text(self.systemAssets[i].getMousePositionInContext(self.context, p), 50, 140);
          // }
          // p.pop();
        }

        p.pop();

        p.fill(p.color(255));
        p.textSize(20);
        p.text(JSON.stringify(self.context), 50, 50);
        p.text("Drawn stars: " + drawn + " | " + Math.round(p.frameRate()) + "fps", 50, 80);
        p.text("isDragging: " + self.isDragging, 50, 110);

      };

      p.mouseClicked = function() {
        for(let i = 0; i < self.systemAssets.length; i++) {
          if (self.systemAssets[i].mouseIntersects(self.context, p)) {
            self.systemAssets[i].isSelected = true;
          }
          else {
            self.systemAssets[i].isSelected = false;
          }
        }
      };

      // p.mouseDragged = function() {
      //   // let event = arguments[0] as MouseEvent;
      //   // self.context.coordinates.x += event.movementX * (1 / self.context.scale);
      //   // self.context.coordinates.y += event.movementY * (1 / self.context.scale);
      // };

      let kanvas = self.elementRef.nativeElement.querySelector("#kanvas");
      // p.mousePressed = function() {
      //   self.isDragging = true;
      //   self.dragStartX = p.mouseX;
      //   self.dragStartY = p.mouseY;
      // };
      kanvas.onmousedown = function() {
        self.isDragging = true;
        self.dragStartX = self.context.position.x;
        self.dragStartY = self.context.position.y;
        self.dragDeltaX = p.mouseX;
        self.dragDeltaY = p.mouseY;
      };

      // p.mouseMoved = function() {
      //   if(self.isDragging) {
      //     let event = arguments[0] as MouseEvent;
      //     // self.context.coordinates.x += event.movementX * (1 / self.context.scale);
      //     // self.context.coordinates.y += event.movementY * (1 / self.context.scale);
      //     self.context.coordinates.x += self.dragStartX - p.mouseX;
      //     self.context.coordinates.y += self.dragStartY - p.mouseY;
      //   }
      // };
      kanvas.onmousemove = function() {
        if(self.isDragging) {
          self.context.position.x = Math.round((self.dragStartX + (p.mouseX - self.dragDeltaX) * (1 / self.context.scale)));
          self.context.position.y = Math.round((self.dragStartY + (p.mouseY - self.dragDeltaY) * (1 / self.context.scale)));

          // TODO velocity
          // self.lastDeltaX = (p.mouseX - self.dragDeltaX);
          // self.lastDeltaY = (p.mouseY - self.dragDeltaY);
        }
      };

      // p.mouseReleased = function() {
      //   self.isDragging = false;
      // };
      kanvas.onmouseup = function() {
        self.isDragging = false;

        // TODO add somehow velocity
        // self.context.velocity.x = self.lastDeltaX;
        // self.context.velocity.y = self.lastDeltaY;
      };

      p.mouseWheel = function () {
        let event = arguments[0] as MouseWheelEvent;

        if (event.wheelDeltaY < 0) {
          self.context.scale -= 0.01;
        }
        else {
          self.context.scale += 0.01;
        }
      };

    };

    this.p = new p5(s, this.elementRef.nativeElement.querySelector("#kanvas"));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.p.resizeCanvas(event.target.innerWidth, event.target.innerHeight, false);
    this.context.size.x = event.target.innerWidth;
    this.context.size.y = event.target.innerHeight;
  }

  onNavigateToTestSystem() {
    this.router.navigate(['/system/194067']);
  }

  // TEST
}
