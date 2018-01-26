import { IAsset } from "../interface/graphics/iasset";
import { IDrawable } from "../interface/graphics/idrawable";
import { ISystem } from "../interface/isystem";

export class SystemAsset extends IAsset {

  private image: p5.Image;
  position: { x: number; y: number } = {x: 0, y: 0};
  size: { width: number; height: number } = {width: 0, height: 0};

  constructor(system: ISystem, image: p5.Image) {
    super();
    this.image = image;
    this.position.x = system.positionX;
    this.position.y = system.positionY;

    this.size.width = image.width;
    this.size.height = image.height;
  }

  drawDefault(p: p5) {
    p.image(this.image, this.position.x, this.position.y);
  }

  drawHovered(p: p5) {
    this.drawDefault(p);

    p.noFill();
    p.strokeWeight(1);
    p.stroke(p.color(255));
    p.ellipse(this.position.x + (this.size.width / 2), this.position.y + (this.size.height / 2), this.size.width, this.size.height);
  }

  drawSelected(p: p5) {
    this.drawDefault(p);

    p.noFill();
    p.strokeWeight(3);
    p.stroke(p.color(255));
    p.ellipse(this.position.x + (this.size.width / 2), this.position.y + (this.size.height / 2), this.size.width, this.size.height);
  }

}
