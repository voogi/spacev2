import { IAsset } from "../interface/graphics/iasset";
import { IDrawable } from "../interface/graphics/idrawable";
import { ISystem } from "../interface/isystem";
import {Context} from "../interface/graphics/context";

export class SystemAsset extends IAsset {

  private randomOffset: number;
  private randomRotationSpeedDivider: number;
  private image: p5.Image;

  constructor(system: ISystem, image: p5.Image) {
    super();
    this.image = image;
    this.position.x = system.positionX;
    this.position.y = system.positionY;

    this.size.x = image.width;
    this.size.y = image.height;

    this.randomOffset = Math.round(Math.random() * 360);
    this.randomRotationSpeedDivider = Math.floor(Math.random() * 3) + 1;
  }

  drawDefault(context: Context, p: p5) {
    p.push();
    p.scale(1 / context.scale);
    p.rotate((p.frameCount / this.randomRotationSpeedDivider) % 360 + this.randomOffset);
    p.image(this.image, 0, 0);
    p.pop();

    // p.push();
    // p.scale(1 / context.scale);
    // p.scale(0.5);
    // p.text(this.position.x + ":" + this.position.y, 30, 30);
    // p.pop();
  }

  drawHovered(context: Context, p: p5) {
    this.drawDefault(context, p);

    p.push();
    p.noFill();
    p.strokeWeight(1);
    p.stroke(p.color(255));
    p.scale(1 / context.scale);
    p.translate(-this.size.x / 2, -this.size.y / 2);
    p.ellipse((this.size.x / 2), (this.size.y / 2), this.size.x, this.size.y);
    p.pop();
  }

  drawSelected(context: Context, p: p5) {
    this.drawDefault(context, p);

    p.push();
    p.noFill();
    p.strokeWeight(3);
    p.stroke(p.color(255));
    p.scale(1 / context.scale);
    p.translate(-this.size.x / 2, -this.size.y / 2);
    p.ellipse((this.size.x / 2), (this.size.y / 2), this.size.x, this.size.y);
    p.pop();
  }

  mouseIntersects(context: Context, p: p5): boolean {
    let v = this.position.copy();
    // let dist = v.mult(1 / context.scale).dist(new p5.Vector(-context.position.x * (1 / context.scale) + p.mouseX, -context.position.y * (1 / context.scale) + p.mouseY));
    let dist = this.position.dist(this.getMousePositionInContext(context, p));
    if (dist < (this.size.x * (1 / context.scale) / 2)) {
      return true;
    }
    return false;
  }

}
