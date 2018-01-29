import { IDrawable } from "../interface/graphics/idrawable";
import { ISystem } from "../interface/isystem";
import { Context } from "../interface/graphics/context";
import { IUIElement } from "../interface/graphics/iuielement";

export class MinimapUIElement extends IUIElement {

  private systems: Array<ISystem> = [];

  private miniMap: p5.Image;

  private p: p5;

  private windowPosition: p5.Vector = new p5.Vector(0, 0);
  private windowSize: p5.Vector = new p5.Vector(0, 0);

  private MAX_SIZE = 12000;

  constructor() {
    super();

    this.size.x = 300;
    this.size.y = 300;
  }

  setP5(p: p5) {
    this.p = p;
  }

  refreshContext(context: Context) {
    this.windowSize.x = context.size.x / this.MAX_SIZE * this.size.x * (1 / context.scale);
    this.windowSize.y = context.size.y / this.MAX_SIZE * this.size.y * (1 / context.scale);

    this.windowPosition.x = Math.min(this.size.x - this.windowSize.x, Math.max(0, -context.position.x / this.MAX_SIZE * this.size.x));
    this.windowPosition.y = Math.min(this.size.y - this.windowSize.y, Math.max(0, -context.position.y / this.MAX_SIZE * this.size.y));
  }

  setSystems(systems: Array<ISystem>) {
    this.systems = systems;

    let img = this.p.createImage(this.size.x, this.size.y);
    img.loadPixels();
    for(let i = 0; i < systems.length; i++) {
      let x = Math.floor((systems[i].positionX / this.MAX_SIZE) * this.size.x);
      let y = Math.floor((systems[i].positionY / this.MAX_SIZE) * this.size.y);

      let color = img.get(x, y);
      img.set(x, y, this.p.color(color[1] + 90));
      img.updatePixels();
    }
    this.miniMap = img;
  }

  getContextCoordinates(p: p5): p5.Vector {
    let position = this.getMousePositionInElement(p);
    let newX = position.x / this.size.x * this.MAX_SIZE,
        newY = position.y / this.size.y * this.MAX_SIZE;

    return new p5.Vector(newX, newY);
  }

  drawDefault(p: p5) {
    if(this.miniMap != undefined) {
      p.push();
      p.translate(2, -2);
      p.fill(p.color(0));
      p.rect(0, 0, this.size.x, this.size.y);

      p.imageMode(p.CORNER);
      p.image(this.miniMap, 0, 0);
      p.imageMode(p.CENTER);

      p.strokeWeight(2);
      p.stroke(p.color(255));
      p.noFill();

      p.rect(this.windowPosition.x, this.windowPosition.y, this.windowSize.x, this.windowSize.y);

      p.pop();
    }
  }

}
