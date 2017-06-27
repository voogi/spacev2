import { Injectable } from '@angular/core';
import * as PIXI from 'pixi.js';

@Injectable()
export class ResourceLoaderService {

  private loader: any = PIXI.loader;
  private resources: Array<string> = [];

  constructor() {
    this.resources = [
      'assets/imgs/stars/blue_giant120.png',
      'assets/imgs/stars/yellow_dwarf60.png',
      'assets/imgs/stars/red_giant120.png',
      'assets/imgs/stars/neutron_star120.png'
    ];
  }

  loadResources(callback: Function) {

    let loaded = false;

    for (const res of this.resources){
      if (this.loader.resources[res] === undefined) {
        break;
      }else {
        loaded = true;
      }

    }

    if (!loaded) {
      this.loader.add(this.resources).load(callback);
    }else {
      callback();
    }

  }

}
