import { Injectable } from '@angular/core';
import * as PIXI from 'pixi.js/dist/pixi.js';

@Injectable()
export class ResourceLoaderService {

  private loader: PIXI.loader = PIXI.loader;
  private resources: Array<string> = [];

  constructor() {
    this.resources = [
      "assets/imgs/starClassK2.png"
    ];
  }

  loadResources(callback:Function){

    let loaded = false;

    for( let res of this.resources){
      if( this.loader.resources[res] == undefined ){
        break;
      }
      else{
        loaded = true
      }

    }

    if(!loaded){
      this.loader.add(this.resources).load(callback);
    }
    else{
      callback();
    }

  }

}