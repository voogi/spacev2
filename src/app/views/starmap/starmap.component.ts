import {Component, ElementRef, HostBinding, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ResourceLoaderService} from '../../services/resource-loader.service';
import {fadeInAnimation} from '../../animations/slide-in-out.animation';
import * as PIXI from 'pixi.js';
import {BackendService} from '../../services/backend.service';
import {ISystem} from '../../shared/interface/isystem';
import {Log, Level} from 'ng2-logger';

class StarContainer extends PIXI.Container {
  relativeStarCoordination: { x: number, y: number };
  attachedSystemObject: ISystem;
}

class StarGraphics extends PIXI.Graphics {
  hovered: boolean;
  pulseRate: number = 0;
}

@Component({
  selector: 'space-starmap',
  templateUrl: './starmap.component.html',
  styles: [`
    .kanvas {
      background: url("../../../assets/imgs/solar_system_background.png") no-repeat;
      background-size: cover;
      overflow: hidden;
      z-index: 50;
    }
  `],
  animations: [fadeInAnimation]
})
export class StarmapComponent implements OnInit {

  private log = Log.create('starmap', Level.ERROR, Level.WARN, Level.INFO);

  @HostBinding('@fadeInAnimation')
  get fadeInAnimation() {
    return '@fadeInAnimation';
  }

  private systemDetailComponentVisible: boolean = false;
  private systemDetailPosition: { left: number, top: number } = {left: 0, top: 0};
  public selectedSystem: ISystem;

  private renderer: any;
  private root: PIXI.Container;
  private stage: PIXI.Container;
  private blueStarsContainer: PIXI.Container;
  private backgroundStarLength: number = 500;
  private isDragging: boolean = false;

  private blueStars: PIXI.particles.ParticleContainer;
  private yellowStars: PIXI.particles.ParticleContainer;

  private interactionManager: PIXI.interaction.InteractionManager;
  private loader: any = PIXI.loader;
  private stars: Array<any> = [];
  private ships: Array<any> = [];
  private dragStart: string = '';

  private deltaX: number = 0;
  private deltaY: number = 0;
  private zoom_factor_counter: number = 0;
  private positionText: PIXI.Text;
  private coordinates: { x: number, y: number } = {x: 5000, y: 5000};
  private pulseRate: number = 0;

  static randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  constructor(private elementRef: ElementRef,
              private router: Router,
              private resourceLoader: ResourceLoaderService,
              private backendService: BackendService) {
    this.coordinates = this.loadCoordinates();
  }

  ngOnInit() {
    this.log.color = 'red';
    this.log.info('ngOnInit', 'completed');
    this.resourceLoader.loadResources(this.initStarMap.bind(this));
  }

  initStarMap() {

    this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
      transparent: true
    });

    this.elementRef.nativeElement.children[0].appendChild(this.renderer.view);

    this.root = new PIXI.Container();
    this.stage = new PIXI.Container();
    this.blueStarsContainer = new PIXI.Container();
    this.root.addChild(this.blueStarsContainer);
    this.root.addChild(this.stage);

    this.bindMouseEvents();

    this.makeDraggableParticles();

    // dummy userUUID
    this.backendService.getDiscoveredSystemByUser('3f22ac02-243a-46d3-a0ff-cb6284f1f97e')
      .subscribe((systems: Array<ISystem>) => {
        this.initStars(systems);
      });

    this.addInfoToCanvas();

    this.gameLoop.call(this);
  }

  addInfoToCanvas() {
    // star name
    const style = new PIXI.TextStyle({
      fill: 0xd3d3d3,
      fontSize: 42,
      fontFamily: "college"
    });

    this.positionText = new PIXI.Text('Position: ' + this.deltaX, style);
    this.positionText.scale.set(0.43);
    this.positionText.x = 10;
    this.positionText.y = 10;

    this.blueStarsContainer.addChild(this.positionText);
  }

  makeDraggableParticles() {

    const container = new PIXI.Container();

    this.blueStars = new PIXI.particles.ParticleContainer(this.backgroundStarLength, {
      scale: true,
      position: true,
      rotation: true,
      uvs: true,
      alpha: true
    });

    this.yellowStars = new PIXI.particles.ParticleContainer(this.backgroundStarLength, {
      scale: true,
      position: true,
      rotation: true,
      uvs: true,
      alpha: true
    });

    container.addChild(this.blueStars);
    container.addChild(this.yellowStars);

    this.blueStarsContainer.addChild(container);


    // const texture = this.renderer.generateTexture();
    for (let i = 0; i < this.backgroundStarLength / 2; i++) {
      const p = new PIXI.Sprite(this.loader.resources['assets/imgs/stars/blue_giant120.png'].texture);
      p.scale.set(0.1);
      const w = StarmapComponent.randomInt(20, window.innerWidth - 20);
      const h = StarmapComponent.randomInt(20, window.innerHeight - 20);
      p.x = w;
      p.y = h;
      this.blueStars.addChild(p);
    }
    for (let i = 0; i < this.backgroundStarLength / 2; i++) {
      const p = new PIXI.Sprite(this.loader.resources['assets/imgs/stars/yellow_dwarf60.png'].texture);
      p.scale.set(0.2);
      const w = StarmapComponent.randomInt(20, window.innerWidth - 20);
      const h = StarmapComponent.randomInt(20, window.innerHeight - 20);
      p.x = w;
      p.y = h;
      this.yellowStars.addChild(p);
    }
  }

  correct(renderer: PIXI.CanvasRenderer, stage: PIXI.Container) {

    stage.x = Math.min(0, stage.x);
    stage.y = Math.min(0, stage.y);

    const visible_width = (renderer.width * stage.scale.x) + stage.x;
    if (visible_width < renderer.view.width) {
      stage.x = Math.min(0, renderer.view.width - (renderer.width * stage.scale.x));
      if (stage.x === 0) {
        stage.scale.x = renderer.view.width / renderer.width;
      }
    }

    const visible_height = (renderer.height * stage.scale.y) + stage.y;
    if (visible_height < renderer.view.height) {
      stage.y = Math.min(0, renderer.view.height - (renderer.height * stage.scale.y));
      if (stage.y === 0) {
        stage.scale.y = renderer.view.height / renderer.height;
      }
    }

    if (stage.scale.y !== stage.scale.x) {
      stage.scale.x = Math.max(stage.scale.x, stage.scale.y);
      stage.scale.y = Math.max(stage.scale.x, stage.scale.y);
    }
  }

  bindMouseEvents() {

    const _this = this;

    this.renderer.view.addEventListener('wheel', function (event) {
      const zoom_in = event.deltaY < 0;
      let zoom_factor;
      if (zoom_in) {
        zoom_factor = 1.1;
        _this.zoom_factor_counter++;

      } else {
        zoom_factor = (1 / 1.1);
        _this.zoom_factor_counter--;
      }

      console.log('ZOOM_FACTOR', _this.zoom_factor_counter);
      if (_this.zoom_factor_counter < -5 || _this.zoom_factor_counter > 5) {
        if (_this.zoom_factor_counter < 0) {
          _this.zoom_factor_counter = 5 * -1;
        } else {
          _this.zoom_factor_counter = 5;
        }

        return;
      }

      _this.stage.scale.x *= zoom_factor;
      _this.stage.scale.y *= zoom_factor;

      const mouse_loc = _this.renderer.plugins.interaction.eventData.data.global;
      _this.stage.x -= ( mouse_loc.x - _this.stage.x ) * ( zoom_factor - 1 );
      _this.stage.y -= ( mouse_loc.y - _this.stage.y ) * ( zoom_factor - 1 );


      _this.correct(_this.renderer, _this.stage);

    });

    this.interactionManager = new PIXI.interaction.InteractionManager(this.renderer);

    this.interactionManager.on('mousedown', function (event) {
      this.deltaX = 0;
      this.deltaY = 0;
      if (event.currentTarget !== null) {
        this.selectedSystem = event.currentTarget.parent;
        const mouse_loc = _this.renderer.plugins.interaction.eventData.data.global;

        this.systemDetailComponentVisible = true;
        this.systemDetailPosition.top = mouse_loc.y;
        this.systemDetailPosition.left = mouse_loc.x;

      } else {
        this.dragStart = JSON.stringify(event.data.global);
        this.isDragging = true;
      }
    }.bind(this));

    this.interactionManager.on('mouseup', function () {
      this.isDragging = false;
    }.bind(this));

    this.interactionManager.on('mouseout', function () {
      this.isDragging = false;
      this.deltaY = 0;
      this.deltaX = 0;
    }.bind(this));

    this.interactionManager.on('mousemove', function (event) {
      if (this.isDragging) {

        const mousePosition = event.data.global;

        const dragS = JSON.parse(this.dragStart);

        this.deltaX = dragS.x - mousePosition.x;
        this.deltaY = dragS.y - mousePosition.y;

        this.dragStart = JSON.stringify({
          x: mousePosition.x,
          y: mousePosition.y
        });

      }
    }.bind(this));
  }

  update() {

    this.coordinates.x += this.deltaX / 6;
    this.coordinates.y += this.deltaY / 6;
    this.storeCoordinates(this.coordinates);
    this.positionText.text = 'Starmap coordinates: X:' + Math.round(this.coordinates.x) + ' -- Y:' + Math.round(this.coordinates.y);

    this.stage.x -= this.deltaX / 6;
    this.stage.y -= this.deltaY / 6;

    for (let child = 0; child < this.blueStars.children.length; child++) {

      const speed = child / 8;

      this.blueStars.children[child].x -= this.deltaX / speed;

      if (this.blueStars.children[child].x < 0) {
        this.blueStars.children[child].x = window.innerWidth;
      }

      if (this.blueStars.children[child].x > window.innerWidth) {
        this.blueStars.children[child].x = 0;
      }


      this.blueStars.children[child].y -= this.deltaY / speed;

      if (this.blueStars.children[child].y > window.innerHeight) {
        this.blueStars.children[child].y = 0;
      }

      if (this.blueStars.children[child].y < 0) {
        this.blueStars.children[child].y = window.innerHeight;
      }

    }

    for (let child = 0; child < this.yellowStars.children.length; child++) {

      const speed = child / 8;

      this.yellowStars.children[child].x -= this.deltaX / speed;

      if (this.yellowStars.children[child].x < 0) {
        this.yellowStars.children[child].x = window.innerWidth;
      }

      if (this.yellowStars.children[child].x > window.innerWidth) {
        this.yellowStars.children[child].x = 0;
      }


      this.yellowStars.children[child].y -= this.deltaY / speed;

      if (this.yellowStars.children[child].y > window.innerHeight) {
        this.yellowStars.children[child].y = 0;
      }

      if (this.yellowStars.children[child].y < 0) {
        this.yellowStars.children[child].y = window.innerHeight;
      }

    }

    for (let i = 0; i < this.stars.length; i++) {

      this.stars[i].children[2].clear();
      this.stars[i].children[2].lineStyle(1, 0xFFFFFF);

      this.stars[i].children[3].clear();
      this.stars[i].children[3].lineStyle(1, 0xFFFFFF);

      if (this.stars[i].children[2].hovered) {
        if (this.stars[i].children[2].pulseRate < 40) {
          this.stars[i].children[2].pulseRate += 3.5;
          this.stars[i].children[3].pulseRate += 3.5;
        }
        this.stars[i].children[2].drawCircle(0, 0, this.stars[i].children[2].pulseRate);
        this.stars[i].children[3].drawCircle(0, 0, this.stars[i].children[3].pulseRate / 2);
      } else {
        this.stars[i].children[2].pulseRate = 0;
        this.stars[i].children[3].pulseRate = 0;
        this.stars[i].children[2].drawCircle(0, 0, 0);
        this.stars[i].children[3].drawCircle(0, 0, 0);
      }

    }

    for (let i = 0; i < this.ships.length; i++) {

      const ship = this.ships[i];

      if (Math.round(ship.ship.x + (ship.deltaX)) === Math.round(ship.destination.x - ship.destination.width / 2)
        || Math.round(ship.ship.y + (ship.deltaY)) === Math.round(ship.destination.y - ship.destination.height / 2)) {
        this.stage.removeChild(ship.ship);
        this.ships.splice(i, 1);
        break;
      }

      ship.ship.x += ship.deltaX;
      ship.ship.y += ship.deltaY;

    }
  }

  gameLoop() {
    requestAnimationFrame(this.gameLoop.bind(this));
    this.update();
    this.renderer.render(this.root);
  }

  initStars(stars: Array<ISystem>) {

    for (let i = 0; i < stars.length; i++) {

      const star = stars[i];

      const textureMap: any = {
        'YELLOW_DWARF': 'assets/imgs/stars/yellow_dwarf60.png',
        'RED_GIANT': 'assets/imgs/stars/red_giant120.png',
        'BLUE_GIANT': 'assets/imgs/stars/blue_giant120.png',
        'BROWN_DWARF': 'assets/imgs/stars/brown_dwarf60.png',
        'WHITE_DWARF': 'assets/imgs/stars/white_dwarf60.png',
        'NEUTRON_STAR': 'assets/imgs/stars/neutron_star120.png',
        'RED_DWARF': 'assets/imgs/stars/red_dwarf60.png',
        'NEBULA': 'assets/imgs/nebula.png',
      };


      const text = textureMap[star.type];
      const _x = star.positionX;
      const _y = star.positionY;

      this.makeNewSystem(text, star.name, {
        x: _x - this.coordinates.x,
        y: _y - this.coordinates.y
      }, {
        x: _x,
        y: _y
      }, star);
    }
  }

  makeNewSystem(texture: string, name: string, position: { x: number, y: number }, relPos: { x: number, y: number }, sys: ISystem) {

    const system = new PIXI.Sprite(this.loader.resources[texture].texture);
    system.interactive = true;
    system.pivot.x = system.width / 2;
    system.pivot.y = system.height / 2;
    // system.scale.set(0.8);

    // system name
    const style = new PIXI.TextStyle({
      fill: 0xd3d3d3,
      fontSize: 32,
      fontFamily: "college"
    });

    const systemName = new PIXI.Text(name, style);
    systemName.pivot.x = systemName.width / 2 - systemName.width;
    systemName.pivot.y = 120;
    systemName.scale.set(0.43);

    // system line to name
    const lineToName = new PIXI.Graphics();
    const s = 1;
    const c = 0xd3d3d3;
    lineToName.lineStyle(s, c, .5);
    lineToName.moveTo(0, 0);
    lineToName.lineTo(75, -35);

    const pulseRing = new StarGraphics();
    pulseRing.pivot.x = pulseRing.width / 2;
    pulseRing.pivot.y = pulseRing.height / 2;
    pulseRing.lineStyle(1, 0xFFFFFF);
    pulseRing.drawCircle(0, 0, 50);
    pulseRing.endFill();
    pulseRing.visible = false;

    const pulseRing1 = new StarGraphics();
    pulseRing1.pivot.x = pulseRing1.width / 2;
    pulseRing1.pivot.y = pulseRing1.height / 2;
    pulseRing1.lineStyle(1, 0xFFFFFF);
    pulseRing1.drawCircle(0, 0, 50);
    pulseRing.endFill();
    pulseRing1.visible = false;

    const container = new StarContainer();
    container.attachedSystemObject = sys;
    container.x = position.x;
    container.y = position.y;
    container.relativeStarCoordination = {
      x: relPos.x,
      y: relPos.y
    };
    container.addChild(systemName);
    container.addChild(lineToName);
    container.addChild(pulseRing);
    container.addChild(pulseRing1);
    container.addChild(system);
    container.pivot.x = container.width / 2;
    container.pivot.y = container.height / 2;
    container.visible = true;

    system.on('pointerover', function () {
      pulseRing.visible = true;
      pulseRing.hovered = true;
      pulseRing1.visible = true;
    })
      .on('pointerout', function () {
        pulseRing.visible = false;
        pulseRing.hovered = false;
        pulseRing1.visible = false;
      });

    this.stars.push(container);
    this.stage.addChild(container);
  }

  storeCoordinates(coords: { x: number, y: number }) {
    localStorage.setItem('starmapCoodinates', JSON.stringify(coords));
  }

  loadCoordinates(): { x: number, y: number } {
    return JSON.parse(localStorage.getItem('starmapCoodinates')) || {x: 5000, y: 5000};
  }

  systemDetailComponentClosed(visible: boolean) {
    this.systemDetailComponentVisible = visible;
  }


  getVelocity(mouse, player, correction) {

    const targetX = (mouse.x - correction) - player.x;
    const targetY = (mouse.y - correction) - player.y;

    const mag = Math.sqrt(targetX * targetX + targetY * targetY);


    return {
      x: (targetX / mag) * 1,
      y: (targetY / mag) * 1
    };

  }

  scoutSystem(system: any) {

    const ship = new PIXI.Sprite(this.loader.resources['assets/imgs/spaceship.png'].texture);
    ship.x = system.x;
    ship.y = system.y;
    ship.scale.set(0.8);
    ship.pivot.x = ship.width / 2;
    ship.pivot.y = ship.height / 2;
    this.stage.addChild(ship);

    const destination = this.stars[16 /*StarmapComponent.randomInt(0,this.stars.length-1)*/];

    this.ships.push({
      ship: ship,
      destination: destination,
      deltaX: this.getVelocity(destination, ship, destination.width / 2).x,
      deltaY: this.getVelocity(destination, ship, destination.height / 2).y
    });

  }

  onNavigateToTestSystem() {
    this.router.navigate(['/system/194067']);
  }

}
