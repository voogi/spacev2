import * as PIXI from 'pixi.js/dist/pixi.js';

export class Point{
  constructor(
    public x: number,
    public y: number,
    public size: number,
  ){}

  create(){
      return new PIXI.Graphics()
  }
}
