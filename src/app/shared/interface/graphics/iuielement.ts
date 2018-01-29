import { IDrawable } from "./idrawable";
import { Context } from "./context";

export abstract class IUIElement {
  position: p5.Vector = new p5.Vector(0, 0);
  size: p5.Vector = new p5.Vector(0, 0);

  isSelected: boolean = false;
  isHovered: boolean = false;

  drawDefault(p: p5): void {

  }

  drawHovered(p: p5): void {
    this.drawDefault(p);
  }

  drawSelected(p: p5): void {
    this.drawDefault(p);
  }

  draw(p: p5): void {
    this.isHovered = this.mouseIntersects(p);
    p.push();
    p.translate(this.position.x, this.position.y);
    if (this.isSelected) {
      this.drawSelected(p);
    }
    else {
      if (this.isHovered) {
        this.drawHovered(p);
      }
      else {
        this.drawDefault(p);
      }
    }
    p.pop();
  }

  getMousePositionInElement(p: p5): p5.Vector {
    return new p5.Vector(Math.floor(p.mouseX - this.position.x), Math.floor(p.mouseY - this.position.y));
  }

  getMousePosition(p: p5): p5.Vector {
    return new p5.Vector(p.mouseX, p.mouseY);
  }

  mouseIntersects(p: p5): boolean {
    return this.pointItersects(this.getMousePosition(p));
  }

  private pointItersects(point: p5.Vector):boolean {
    let x1 = this.position.x;
    let y1 = this.position.y;
    let x2 = this.position.x + this.size.x;
    let y2 = this.position.y + this.size.y;

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
