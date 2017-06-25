import {Component, ElementRef, HostBinding, OnInit} from '@angular/core';
import * as PIXI from 'pixi.js/dist/pixi.js';
import {Router} from '@angular/router';
import {ResourceLoaderService} from '../../services/resource-loader.service';
import {fadeInAnimation} from '../../animations/slide-in-out.animation';

@Component({
  selector: 'space-starmap',
  templateUrl: './starmap.component.html',
  styleUrls: ['./starmap.component.css'],
  animations: [fadeInAnimation]
})
export class StarmapComponent implements OnInit {

  @HostBinding('@fadeInAnimation') get fadeInAnimation() {
    return '@fadeInAnimation';
  }

  private renderer: any;
  private stage: PIXI.Container;
  private backgroundStarLength: number = 500;
  private isDragging: boolean = false;

  private littleStars: PIXI.particles.ParticleContainer;
  private littleStars1: PIXI.particles.ParticleContainer;
  private verticalGrid: PIXI.Container;
  private horizontalGrid: PIXI.Container;

  private interactionManager: PIXI.interaction.InteractionManager;
  private loader: PIXI.loader = PIXI.loader;
  private stars: Array<any> = [];
  private dragStart: string = '';

  private deltaX: number = 0;
  private deltaY: number = 0;

  static makeParticleGraphic( ax: number, ay: number, bx: number, by: number ) {
    const gr = new PIXI.Graphics();
    const s = 1;
    const c = 0xFFFFFFF;
    gr.lineStyle(s,c,0.1);
    gr.moveTo(ax,ay);
    gr.lineTo(bx, by);
    return gr;
  }

  static randomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  constructor(private elementRef: ElementRef, private router: Router, private resourceLoader: ResourceLoaderService) { }

  ngOnInit() {
    this.resourceLoader.loadResources(this.init.bind(this));
  }

  init() {

    this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
      transparent : true
    });

    this.elementRef.nativeElement.children[0].appendChild(this.renderer.view);

    this.stage = new PIXI.Container();

    this.bindMouseEvents();

    this.makeDraggableParticles();

    this.makeDraggableGrid();

    this.initStars();

    this.gameLoop.call(this);
  }

  makeDraggableGrid() {

    this.verticalGrid = new PIXI.Container(32, {
      scale: true,
      position: true,
      rotation: true,
      uvs: true,
      alpha: true
    });

    for( let i = 0; i < 32 ; i++ ) {
      const texture = new PIXI.Sprite( this.renderer.generateTexture( StarmapComponent.makeParticleGraphic(
        60*i,0,
        60*i,window.innerHeight
      )));
      texture.x = 60*i;
      texture.y = 0;
      this.verticalGrid.addChild(texture);
    }

    this.stage.addChild(this.verticalGrid);

    this.horizontalGrid = new PIXI.Container(32, {
      scale: true,
      position: true,
      rotation: true,
      uvs: true,
      alpha: true
    });

    for( let i = 0; i < 16 ; i++ ) {
      const texture = new PIXI.Sprite( this.renderer.generateTexture( StarmapComponent.makeParticleGraphic(
        0,60*i,
        window.innerWidth,60*i
      )));
      texture.x = 0;
      texture.y = 60*i;
      this.horizontalGrid.addChild(texture);
    }

    this.stage.addChild(this.horizontalGrid);

  }

  makeDraggableParticles() {

    const container = new PIXI.Container();

    this.littleStars = new PIXI.particles.ParticleContainer(this.backgroundStarLength, {
      scale: true,
      position: true,
      rotation: true,
      uvs: true,
      alpha: true
    });

    this.littleStars1 = new PIXI.particles.ParticleContainer(this.backgroundStarLength, {
      scale: true,
      position: true,
      rotation: true,
      uvs: true,
      alpha: true
    });

    container.addChild(this.littleStars);
    container.addChild(this.littleStars1);

    this.stage.addChild(container);


    // const texture = this.renderer.generateTexture();
    for (let i = 0; i < this.backgroundStarLength/2; i++) {
      let p = new PIXI.Sprite( this.loader.resources['assets/imgs/stars/blue_giant120.png'].texture);
      p.scale.set(0.1);
      const w = StarmapComponent.randomInt(20, window.innerWidth - 20);
      const h = StarmapComponent.randomInt(20, window.innerHeight - 20);
      p.x = w;
      p.y = h;
      this.littleStars.addChild(p);
    }
    for (let i = 0; i < this.backgroundStarLength/2; i++) {
      let p = new PIXI.Sprite( this.loader.resources['assets/imgs/stars/yellow_dwarf60.png'].texture);
      p.scale.set(0.2);
      const w = StarmapComponent.randomInt(20, window.innerWidth - 20);
      const h = StarmapComponent.randomInt(20, window.innerHeight - 20);
      p.x = w;
      p.y = h;
      this.littleStars1.addChild(p);
    }
  }

  bindMouseEvents() {

    this.interactionManager = new PIXI.interaction.InteractionManager(this.renderer);

    this.interactionManager.on('mousedown', function(event){
      this.deltaX = 0;
      this.deltaY = 0;
      if(event.currentTarget !== null){
        console.log("SELECTED_STAR",event.currentTarget)
      }else{
        this.dragStart = JSON.stringify( event.data.global );
        this.isDragging = true;
      }
    }.bind(this));

    this.interactionManager.on('mouseup', function(){
      this.isDragging = false;
    }.bind(this));

    this.interactionManager.on('mouseout', function() {
      this.isDragging = false;
      this.deltaY = 0;
      this.deltaX = 0;
    }.bind(this));

    this.interactionManager.on('mousemove', function(event){
      if (this.isDragging) {

        const mousePosition = event.data.global;

        const dragS = JSON.parse( this.dragStart );

        this.deltaX = dragS.x - mousePosition.x;
        this.deltaY = dragS.y - mousePosition.y;

        this.dragStart = JSON.stringify({
          x : mousePosition.x,
          y : mousePosition.y
        });

      }
    }.bind(this));
  }

  update() {
    for ( let child = 0 ; child < this.littleStars.children.length; child++) {

      let speed = child/8;

      this.littleStars.children[child].x -= this.deltaX / speed;

      if (this.littleStars.children[child].x < 0) {
        this.littleStars.children[child].x = window.innerWidth;
      }

      if (this.littleStars.children[child].x > window.innerWidth) {
        this.littleStars.children[child].x = 0;
      }


      this.littleStars.children[child].y -= this.deltaY / speed;

      if (this.littleStars.children[child].y > window.innerHeight) {
        this.littleStars.children[child].y = 0;
      }

      if (this.littleStars.children[child].y < 0) {
        this.littleStars.children[child].y = window.innerHeight;
      }

    }

    for ( let child = 0 ; child < this.littleStars1.children.length; child++) {

      let speed = child/8;

      this.littleStars1.children[child].x -= this.deltaX / speed;

      if (this.littleStars1.children[child].x < 0) {
        this.littleStars1.children[child].x = window.innerWidth;
      }

      if (this.littleStars1.children[child].x > window.innerWidth) {
        this.littleStars1.children[child].x = 0;
      }


      this.littleStars1.children[child].y -= this.deltaY / speed;

      if (this.littleStars1.children[child].y > window.innerHeight) {
        this.littleStars1.children[child].y = 0;
      }

      if (this.littleStars1.children[child].y < 0) {
        this.littleStars1.children[child].y = window.innerHeight;
      }

    }

    for ( let child = 0 ; child < this.verticalGrid.children.length; child++) {
      this.verticalGrid.children[child].x -= this.deltaX;

      if (this.verticalGrid.children[child].x < 0) {
        this.verticalGrid.children[child].x = window.innerWidth;
      }

      if (this.verticalGrid.children[child].x > window.innerWidth) {
        this.verticalGrid.children[child].x = 0;
      }
    }

    for ( let child = 0 ; child < this.horizontalGrid.children.length; child++) {
      this.horizontalGrid.children[child].y -= this.deltaY;

      if (this.horizontalGrid.children[child].y > window.innerHeight) {
        this.horizontalGrid.children[child].y = 0;
      }

      if (this.horizontalGrid.children[child].y < 0) {
        this.horizontalGrid.children[child].y = window.innerHeight;
      }
    }

    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i].x -= this.deltaX;
      this.stars[i].y -= this.deltaY;
    }
  }

  gameLoop() {
    requestAnimationFrame(this.gameLoop.bind(this));
    this.update();
    this.renderer.render(this.stage);
  }

  initStars() {
    const star = new PIXI.Sprite(this.loader.resources['assets/imgs/stars/blue_giant120.png'].texture);
    star.x = window.innerWidth / 2;
    star.y = window.innerHeight / 2;
    star.scale.set(0.6);
    star.interactive = true;
    star.buttonMode = true;
    this.stage.addChild(star);
    this.stars.push(star);
  }

  onNavToSystem(id: number) {
    this.router.navigate(['/system', id]);
  }

}
