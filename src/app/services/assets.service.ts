import { Injectable } from '@angular/core';
import { ISystem } from "../shared/interface/isystem";
import { IAsset } from "../shared/interface/graphics/iasset";
import { SystemAsset } from "../shared/assets/system-asset";

@Injectable()
export class AssetsService {

  private systemImages: {[type: string] : p5.Image} = {};

  private p: p5;

  constructor() {}

  setP5(p: p5) {
    this.p = p;

    this.init();
  }

  loadAssets() {
    let systems: {[id: string] : string} = {
      "BLUE_GIANT"   : 'assets/imgs/stars/blue_giant120.png',
      "YELLOW_DWARF" : 'assets/imgs/stars/yellow_dwarf60.png',
      "RED_GIANT"    : 'assets/imgs/stars/red_giant120.png',
      "RED_DWARF"    : 'assets/imgs/stars/red_dwarf60.png',
      "WHITE_DWARF"  : 'assets/imgs/stars/white_dwarf60.png',
      "BROWN_DWARF"  : 'assets/imgs/stars/brown_dwarf60.png',
      "NEBULA"       : 'assets/imgs/nebula.png',
      "NEUTRON_STAR" : 'assets/imgs/stars/neutron_star120.png'
    };

    let keys = Object.keys(systems);
    for(let i = 0; i < keys.length; i++) {
      this.systemImages[keys[i]] = this.p.loadImage(systems[keys[i]]);
    }
  }

  init() {
    this.loadAssets();
  }

  system(system: ISystem): IAsset {
    return new SystemAsset(system, this.systemImages[system.type]);
  }

}
