import {Component, ElementRef, OnInit} from '@angular/core';
import * as PIXI from 'pixi.js/dist/pixi.js';

@Component({
  selector: 'space-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {

  private renderer: any;
  private stage: PIXI.Container;
  private backgroundStarLength: number = 500;
  private isDragging: boolean = false;
  private littleStars: PIXI.particles.ParticleContainer;
  private littleStarsDecoys: any = {};
  private interactionManager: PIXI.interaction.InteractionManager;
  private loader: PIXI.loader = PIXI.loader;
  private stars: Array<any> = [];

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.loader.add("assets/imgs/starClassK2.png").load(this.init.bind(this));
  }

  init(){

    this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
      transparent : true
    });


    this.elementRef.nativeElement.children[0].appendChild(this.renderer.view);

    this.stage = new PIXI.Container();

    let pointsArr = [];

    let dragStart = "";

    this.interactionManager = new PIXI.interaction.InteractionManager(this.renderer);

    this.interactionManager.on('mousedown', function(event){
      dragStart = JSON.stringify( event.data.global );
      this.isDragging = true;
    }.bind(this));

    this.interactionManager.on('mouseup', function(){
      this.isDragging = false;
    }.bind(this));

    this.interactionManager.on("mouseout", function() {
      this.isDragging = false;
    }.bind(this));

    this.interactionManager.on('mousemove',function(event){
      if(this.isDragging){

        let mousePosition = event.data.global;

        let dragS = JSON.parse( dragStart );

        let deltaX = dragS.x - mousePosition.x;
        let deltaY = dragS.y - mousePosition.y;

        dragStart = JSON.stringify({
          x : mousePosition.x,
          y : mousePosition.y
        });

        for( let child = 0 ; child < pointsArr.length; child++){

          pointsArr[child].x -= deltaX/child;

          if(pointsArr[child].x < 0){
            pointsArr[child].x = window.innerWidth;
          }

          if(pointsArr[child].x > window.innerWidth){
            pointsArr[child].x = 0;
          }


          pointsArr[child].y -= deltaY/child;

          if(pointsArr[child].y > window.innerHeight){
            pointsArr[child].y = 0;
          }

          if(pointsArr[child].y < 0){
            pointsArr[child].y = window.innerHeight;
          }

          // for(let i = 0; i < 5; i++){
          //   this.littleStarsDecoys[child][i].x -= (deltaX/child);
          //   this.littleStarsDecoys[child][i].y -= (deltaY/child)
          // }
        }

        for( let i = 0; i < this.stars.length; i++){
          this.stars[i].x -= deltaX/6
          this.stars[i].y -= deltaY/6
        }


      }
    }.bind(this));

    this.littleStars = new PIXI.particles.ParticleContainer(this.backgroundStarLength, {
      scale: true,
      position: true,
      rotation: true,
      uvs: true,
      alpha: true
    });

    this.stage.addChild(this.littleStars);

    let texture = this.renderer.generateTexture( BackgroundComponent.makeParticleGraphic(0.8) );

    let decoyTexture = [
      this.renderer.generateTexture( BackgroundComponent.makeParticleGraphic(0.6) ),
      this.renderer.generateTexture( BackgroundComponent.makeParticleGraphic(0.5) ),
      this.renderer.generateTexture( BackgroundComponent.makeParticleGraphic(0.4) ),
      this.renderer.generateTexture( BackgroundComponent.makeParticleGraphic(0.3) ),
      this.renderer.generateTexture( BackgroundComponent.makeParticleGraphic(0.2) )
    ];

    for( let i = 0; i < this.backgroundStarLength; i++){

      let index = i;
      const p = new PIXI.Sprite(texture);
      let w = BackgroundComponent.randomInt(20,window.innerWidth-20);
      let h = BackgroundComponent.randomInt(20,window.innerHeight-20);
      p.x = w;
      p.y = h;
      this.littleStars.addChild(p);
      pointsArr.push(p);

      this.littleStarsDecoys[index] = [];

      // for( let i = 0; i < 5; i++){
      //   const lp = new PIXI.Sprite(decoyTexture[i]);
      //   lp.x = w;
      //   lp.y = h;
      //   this.littleStars.addChild(lp);
      //   this.littleStarsDecoys[index].push(lp);
      // }

    }

    this.initStars();

    this.gameLoop.call(this);
  }

  gameLoop(){
    requestAnimationFrame(this.gameLoop.bind(this));
    this.renderer.render(this.stage)
  }

  initStars(){
    const star = new PIXI.Sprite(this.loader.resources["assets/imgs/starClassK2.png"].texture);
    star.x = window.innerWidth/2;
    star.y = window.innerHeight/2;
    star.scale.set(0.2);
    this.stage.addChild(star);


    this.stars.push(star);
  }

  static makeParticleGraphic(alpha:number){
    let gr = new PIXI.Graphics();
    gr.beginFill(0xFFFFFF , alpha);
    gr.drawCircle(0, 0, 3);
    return gr
  }

  static randomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
