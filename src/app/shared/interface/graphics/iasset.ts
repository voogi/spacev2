import { IDrawable } from "./idrawable";
import { Context } from "./context";

export abstract class IAsset implements IDrawable {
  position: p5.Vector = new p5.Vector(0, 0);
  size: p5.Vector = new p5.Vector(0, 0);

  isSelected: boolean = false;
  isHovered: boolean = false;

  drawDefault(context: Context, p: p5): void {

  }

  drawHovered(context: Context, p: p5): void {
    this.drawDefault(context, p);
  }

  drawSelected(context: Context, p: p5): void {
    this.drawDefault(context, p);
  }

  draw(context: Context, p: p5): boolean {
    let r1 = {
      left: this.position.x,
      right: this.position.x + this.size.x * (1 / context.scale),
      top: this.position.y,
      bottom: this.position.y + this.size.y * (1 / context.scale)
    };

    let r2 = {
      left: -context.position.x,
      right: -context.position.x + context.size.x * (1 / context.scale),
      top: -context.position.y,
      bottom: -context.position.y + context.size.y * (1 / context.scale)
    };

    if(this.boxIntersects(r1, r2)) {
      this.isHovered = this.mouseIntersects(context, p);
      p.push();
      p.translate(this.position.x, this.position.y);
      if (this.isSelected) {
        this.drawSelected(context, p);
      }
      else {
        if (this.isHovered) {
          this.drawHovered(context, p);
        }
        else {
          this.drawDefault(context, p);
        }
      }
      p.pop();
      return true;
    }
    return false;
  }

  getMousePositionInContext(context: Context, p: p5): p5.Vector {
    return this.getPointInContext(context, new p5.Vector(p.mouseX, p.mouseY));
  }

  getPointInContext(context: Context, point: p5.Vector): p5.Vector {
    let x = Math.round((-context.position.x) + point.x * (1 / context.scale));
    let y = Math.round((-context.position.y) + point.y * (1 / context.scale));
    return new p5.Vector(x, y);
  }

  mouseIntersects(context: Context, p: p5): boolean {
    return this.pointItersects(context, this.getMousePositionInContext(context, p), false);
  }

  mouseIntersectsScaled(context: Context, p: p5): boolean {
    return this.pointItersects(context, this.getMousePositionInContext(context, p), true);
  }

  private pointItersects(context: Context, point: p5.Vector, scaled: boolean):boolean {
    let scale = scaled ? context.scale : (1 / context.scale);
    let x1 = this.position.x - ((this.size.x / 2) * scale);
    let y1 = this.position.y - ((this.size.y / 2) * scale);
    let x2 = this.position.x + ((this.size.x / 2) * scale);
    let y2 = this.position.y + ((this.size.y / 2) * scale);

    if(x1 < point.x && point.x < x2 &&
       y1 < point.y && point.y < y2) {
      return true;
    }
    return false;
  }

  private boxIntersects(r1, r2): boolean {
    return !(r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top);
  }
}
