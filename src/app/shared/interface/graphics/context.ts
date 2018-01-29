export class Context {

  position: p5.Vector;
  velocity: p5.Vector;
  size: p5.Vector;
  scale: number;
  targetScale: number;
  targetPoint: p5.Vector;

  constructor() {
    this.position = new p5.Vector(-5000, -5500);
    this.size = new p5.Vector(0, 0);
    this.velocity = new p5.Vector(0, 0);
    this.scale = 3.0;
    this.targetScale = 3.0;
    this.targetPoint = new p5.Vector(0, 0);
  }

}

