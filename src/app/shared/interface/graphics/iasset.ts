import { IDrawable } from "./idrawable";
import { Context } from "./context";

export abstract class IAsset implements IDrawable {
  position: {x: number, y: number} = {x: 0, y: 0};
  size: {width: number, height: number} = {width: 0, height: 0};

  isSelected: boolean = false;

  drawDefault(p: p5): void {

  }

  drawHovered(p: p5): void {
    this.drawDefault(p);
  }

  drawSelected(p: p5): void {
    this.drawDefault(p);
  }

  draw(context: Context, p: p5): boolean {
    let r1 = {
      left: this.position.x * context.scale + context.coordinates.x * context.scale,
      right: this.position.x * context.scale + context.coordinates.x * context.scale + this.size.width * context.scale,
      top: this.position.y * context.scale + context.coordinates.y * context.scale,
      bottom: this.position.y * context.scale + context.coordinates.y * context.scale + this.size.height * context.scale
    };

    let r2 = {
      left: 0,
      right: context.size.width,
      top: 0,
      bottom: context.size.height
    };

    // Test

    if(this.boxIntersects(r1, r2)) {
      if (this.isSelected) {
        this.drawSelected(p);
      }
      else {
        if (this.mouseIntersects(context, p)) {
          this.drawHovered(p);
        }
        else {
          this.drawDefault(p);
        }
      }
      return true;
    }
    return false;
  }

  mouseIntersects(context: Context, p: p5): boolean {
    return this.pointItersects(context, p.mouseX, p.mouseY);
  }

  private pointItersects(context: Context, mX: number, mY: number):boolean {
    let x = this.position.x * context.scale + context.coordinates.x * context.scale;
    let y = this.position.y * context.scale + context.coordinates.y * context.scale;

    if(x < mX && x + this.size.width * context.scale > mX &&
      y < mY && y + this.size.height * context.scale > mY) {
      return true;
    }
    return false;
  }

  private boxIntersects(r1, r2): boolean {
    return !(r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top);
  }
}
