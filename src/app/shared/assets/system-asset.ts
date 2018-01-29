import { IAsset } from "../interface/graphics/iasset";
import { IDrawable } from "../interface/graphics/idrawable";
import { ISystem } from "../interface/isystem";
import {Context} from "../interface/graphics/context";

export class SystemAsset extends IAsset {

  private randomOffset: number;
  private randomRotationSpeedDivider: number;
  private image: p5.Image;

  private system: ISystem;

  private targetOpacity: number = 0.0;
  private opacity: number = 0.0;

  private shouldBeExtended:boolean = false;

  constructor(system: ISystem, image: p5.Image) {
    super();
    this.image = image;
    this.position.x = system.positionX;
    this.position.y = system.positionY;

    this.size.x = image.width;
    this.size.y = image.height;

    this.randomOffset = Math.round(Math.random() * 360);
    this.randomRotationSpeedDivider = Math.floor(Math.random() * 3) + 10;

    this.system = system;
  }

  drawDefault(context: Context, p: p5) {
    p.push();
    p.scale(1 / context.scale);
    p.scale(Math.min(1, Math.max(0.25, context.scale)));
    p.rotate((p.frameCount / this.randomRotationSpeedDivider) % 360 + this.randomOffset);
    p.image(this.image, 0, 0);
    p.pop();
  }

  drawHovered(context: Context, p: p5) {
    this.drawDefault(context, p);
  }

  drawSelected(context: Context, p: p5) {
    this.drawDefault(context, p);
  }

  drawDefault2ndPass(context: Context, p: p5):void {
    if(!this.isSelected) {
      this.drawData(context, p,false);
    }
  }

  drawHovered2ndPass(context: Context, p: p5):void {
    let div = Math.min(1, Math.max(0.25, context.scale));
    p.push();
    p.noFill();
    p.strokeWeight(1);
    p.stroke(p.color(255));
    p.scale(1 / context.scale);
    p.ellipse(0, 0, this.size.x * div, this.size.y * div);
    p.pop();

    if(!this.isSelected) {
      this.drawData(context,p,true);
    }
  }

  drawSelected2ndPass(context: Context, p: p5):void {
    let div = Math.min(1, Math.max(0.25, context.scale));
    p.push();
    p.noFill();
    p.strokeWeight(3);
    p.stroke(p.color(255));
    p.scale(1 / context.scale);
    p.ellipse(0, 0, this.size.x * div, this.size.y * div);
    p.pop();

    this.drawData(context,p,true, true);
  }

  private drawData(context: Context, p: p5, extended: boolean, forced: boolean = false) {
    if(forced == true || context.scale >= 3.0) {
      this.shouldBeExtended = extended;
      this.targetOpacity = 255;
    }
    else {
      this.targetOpacity = 0;
    }

    if(this.targetOpacity == 255 || this.targetOpacity == 0 && this.opacity != 0) {
      if(this.opacity != this.targetOpacity) {
        if(this.opacity < this.targetOpacity) {
          this.opacity += 10;
        }
        else {
          this.opacity -= 10;
        }

        if(this.opacity <= 0) {
          this.opacity = 0;
          this.shouldBeExtended = false;
        }
        else if(this.opacity >= 255) {
          this.opacity = 255;
        }
      }

      let r = (this.size.x / 2) + 20;
      let col = p.color(255, this.opacity);

      p.push();
      p.stroke(col);
      p.fill(col);
      p.scale(1 / context.scale);
      if(this.shouldBeExtended) {
        p.text("Name: " + this.system.name, r + 10, -r + 15);
        p.text("Type: " + this.system.type, r + 10, -r + 40);
        p.text("Coordinates: " + this.system.positionX + ":" + this.system.positionY, r + 10, -r + 65);
        p.line(0, 0, r, -r);
        p.line(r, -r, r, -r + 65);
      }
      else {
        p.text("Name: " + this.system.name, r + 10, -r + 15);
        p.line(r, -r, r, -r + 20);
        p.line(0, 0, r, -r);
      }
      p.pop();
    }
  }

  mouseIntersects(context: Context, p: p5): boolean {
    let div = Math.min(1, Math.max(0.25, (1 / context.scale)));
    let dist = this.position.dist(this.getMousePositionInContext(context, p));
    if (dist < ((this.size.x * div) / 2)) {
      return true;
    }
    return false;
  }

}
