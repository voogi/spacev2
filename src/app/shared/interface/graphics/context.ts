export class Context {

  position: p5.Vector;
  velocity: p5.Vector;
  size: p5.Vector;
  scale: number;

  constructor() {
    this.position = new p5.Vector(-5500, -5500);
    this.size = new p5.Vector(0, 0);
    this.velocity = new p5.Vector(0, 0);
    this.scale = 1.0;
  }

}

