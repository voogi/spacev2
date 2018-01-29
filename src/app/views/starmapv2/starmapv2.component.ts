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
import { MinimapUIElement } from "../../shared/uielements/minimap-uielement";

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
  private minimapUIElement: MinimapUIElement;

  private isDragging: boolean = false;
  private dragStartX: number = 0;
  private dragStartY: number = 0;
  private dragDeltaX: number = 0;
  private dragDeltaY: number = 0;
  private lastDeltaX: number = 0;
  private lastDeltaY: number = 0;

  private headerHeight: number = 50;

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

    this.minimapUIElement = new MinimapUIElement();
  }

  initStarMap() {
    let self = this;

    let s = (p: p5) => {

      p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);

        p.imageMode(p.CENTER);
        p.angleMode(p.DEGREES);

        self.context.size.x = p.windowWidth;
        self.context.size.y = p.windowHeight - self.headerHeight;
        self.minimapUIElement.position.y = self.context.size.y - self.minimapUIElement.size.y;

        self.assetsService.setP5(p);
        self.minimapUIElement.setP5(p);

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
            self.minimapUIElement.setSystems(systems);
          });
      };

      p.draw = function() {
        p.clear();

        self.context.position.x += self.context.velocity.x;
        self.context.position.y += self.context.velocity.y;

        self.zoomToPoint();

        p.push();
        p.scale(self.context.scale);
        p.translate(self.context.position.x, self.context.position.y);

        // Draw systems
        let drawn = 0;
        for(let i = 0; i < self.systemAssets.length; i++) {
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

        if(self.minimapUIElement != null) {
          self.minimapUIElement.draw(p);
        }

        p.fill(p.color(255));
        p.textSize(20);
        p.text(JSON.stringify(self.context), 50, 50);
        p.text("Drawn stars: " + drawn + " | " + Math.round(p.frameRate()) + "fps", 50, 80);
        p.text("isDragging: " + self.isDragging, 50, 110);

      };

      p.mouseClicked = function() {
        if(self.minimapUIElement.isHovered) {
          let position: p5.Vector = self.minimapUIElement.getContextCoordinates(p);

          self.context.position.x = -(position.x - (self.context.size.x * (1 / self.context.scale) / 2));
          self.context.position.y = -(position.y - (self.context.size.y * (1 / self.context.scale) / 2));

          self.minimapUIElement.refreshContext(self.context);
        }
        else {
          for(let i = 0; i < self.systemAssets.length; i++) {
            if (self.systemAssets[i].isHovered) {
              self.systemAssets[i].isSelected = true;
            }
            else {
              self.systemAssets[i].isSelected = false;
            }
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
        if(self.minimapUIElement.isHovered) {

        }
        else {
          self.dragStartX = self.context.position.x;
          self.dragStartY = self.context.position.y;
          self.dragDeltaX = p.mouseX;
          self.dragDeltaY = p.mouseY;
        }
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
          if(self.minimapUIElement.isHovered) {
            let position: p5.Vector = self.minimapUIElement.getContextCoordinates(p);

            self.context.position.x = -(position.x - (self.context.size.x * (1 / self.context.scale) / 2));
            self.context.position.y = -(position.y - (self.context.size.y * (1 / self.context.scale) / 2));

            self.minimapUIElement.refreshContext(self.context);
          }
          else {
            self.context.position.x = Math.round((self.dragStartX + (p.mouseX - self.dragDeltaX) * (1 / self.context.scale)));
            self.context.position.y = Math.round((self.dragStartY + (p.mouseY - self.dragDeltaY) * (1 / self.context.scale)));

            self.minimapUIElement.refreshContext(self.context);
            // TODO velocity
            // self.lastDeltaX = (p.mouseX - self.dragDeltaX);
            // self.lastDeltaY = (p.mouseY - self.dragDeltaY);
          }
        }
      };

      kanvas.ondblclick = function() {
        if(self.minimapUIElement.isHovered) {
          // let position: p5.Vector = self.minimapUIElement.getContextCoordinates(p);
          //
          // self.context.targetScale = 3.0;
          // self.context.targetPoint = position;
        }
        else {
          self.context.targetScale = 3.0;
          self.context.targetPoint = new p5.Vector(p.mouseX, p.mouseY);
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
          self.context.targetScale = self.context.scale - (self.context.scale * 0.1);
        }
        else {
          self.context.targetScale = self.context.scale + (self.context.scale * 0.1);
        }

        self.context.targetPoint = new p5.Vector(p.mouseX, p.mouseY);
      };

      p.keyPressed = function() {
        let event = arguments[0] as KeyboardEvent;

        if(event.keyCode == 109) { // -
          self.context.targetScale = self.context.scale - (self.context.scale * 0.1);
        }
        else if(event.keyCode == 107) { // +
          self.context.targetScale = self.context.scale + (self.context.scale * 0.1);
        }

        self.context.targetPoint = new p5.Vector(p.mouseX, p.mouseY);
      };

    };

    this.p = new p5(s, this.elementRef.nativeElement.querySelector("#kanvas"));
  }

  zoomToPoint() {
    if(this.context.scale != this.context.targetScale) {
      let oldSizeX = this.context.size.x * (1 / this.context.scale),
        oldSizeY = this.context.size.y * (1 / this.context.scale);

      if(this.context.targetScale > this.context.scale) {
        this.context.scale += 0.1;
      }
      else if(this.context.targetScale < this.context.scale) {
        this.context.scale -= 0.1;
      }

      if(Math.abs(this.context.scale - this.context.targetScale) < 0.1) {
        this.context.scale = this.context.targetScale;
      }

      this.context.scale = Math.round(this.context.scale * 100) / 100;
      this.context.scale = Math.min(5, Math.max(0.3, this.context.scale));

      let newSizeX = this.context.size.x * (1 / this.context.scale),
        newSizeY = this.context.size.y * (1 / this.context.scale);

      let translateX = this.context.size.x * (1 / this.context.scale) * (1 - (oldSizeX / newSizeX)),
        translateY = this.context.size.y * (1 / this.context.scale) * (1 - (oldSizeY / newSizeY));

      let ratioX = this.context.targetPoint.x / this.context.size.x,
        ratioY = this.context.targetPoint.y / this.context.size.y;

      this.context.position.x += (translateX * ratioX);
      this.context.position.y += (translateY * ratioY);

      this.minimapUIElement.refreshContext(this.context);
    }

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.p.resizeCanvas(event.target.innerWidth, event.target.innerHeight, false);
    this.context.size.x = event.target.innerWidth;
    this.context.size.y = event.target.innerHeight - this.headerHeight;
    this.minimapUIElement.position.y = this.context.size.y - this.minimapUIElement.size.y;
    this.minimapUIElement.refreshContext(this.context);
  }

  onNavigateToTestSystem() {
    this.router.navigate(['/system/194067']);
  }

}
