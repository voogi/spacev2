import {Component, ElementRef, HostBinding, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ResourceLoaderService} from '../../services/resource-loader.service';
import {fadeInAnimation} from '../../animations/slide-in-out.animation';
import * as PIXI from 'pixi.js';

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

    private interactionManager: PIXI.interaction.InteractionManager;
    private loader: any = PIXI.loader;
    private stars: Array<any> = [];
    private dragStart: string = '';

    private deltaX: number = 0;
    private deltaY: number = 0;
    private zoom_factor_counter: number = 0;
    private positionText: PIXI.Text;
    private coords: PIXI.Text;
    private coordinates: { x: number, y: number } = { x: 0, y: 0 };

    private pulseRate: number = 0;

    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    constructor(private elementRef: ElementRef, private router: Router, private resourceLoader: ResourceLoaderService) {
    }

    ngOnInit() {
        this.resourceLoader.loadResources(this.init.bind(this));
    }

    init() {

        this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
            transparent: true
        });

        this.elementRef.nativeElement.children[0].appendChild(this.renderer.view);

        this.stage = new PIXI.Container();

        this.bindMouseEvents();

        this.makeDraggableParticles();

        this.initStars();

        this.addInfoToCanvas();

        this.gameLoop.call(this);
    }

    addInfoToCanvas() {
        // star name
        const style = new PIXI.TextStyle({
            fill: 0xd3d3d3,
            fontSize: 42
        });

        this.positionText = new PIXI.Text('Position: ' + this.deltaX, style);
        this.positionText.scale.set(0.43);
        this.positionText.x = window.innerWidth - 400;
        this.positionText.y = 30;

        this.coords = new PIXI.Text('Position: ' + this.deltaX, style);
        this.coords.scale.set(0.43);
        this.coords.x = window.innerWidth - 400;
        this.coords.y = 70;

        this.stage.addChild(this.positionText);
        this.stage.addChild(this.coords);
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
        for (let i = 0; i < this.backgroundStarLength / 2; i++) {
            const p = new PIXI.Sprite(this.loader.resources['assets/imgs/stars/blue_giant120.png'].texture);
            p.scale.set(0.1);
            const w = StarmapComponent.randomInt(20, window.innerWidth - 20);
            const h = StarmapComponent.randomInt(20, window.innerHeight - 20);
            p.x = w;
            p.y = h;
            this.littleStars.addChild(p);
        }
        for (let i = 0; i < this.backgroundStarLength / 2; i++) {
            const p = new PIXI.Sprite(this.loader.resources['assets/imgs/stars/yellow_dwarf60.png'].texture);
            p.scale.set(0.2);
            const w = StarmapComponent.randomInt(20, window.innerWidth - 20);
            const h = StarmapComponent.randomInt(20, window.innerHeight - 20);
            p.x = w;
            p.y = h;
            this.littleStars1.addChild(p);
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

        this.coordinates.x += this.deltaX;
        this.coordinates.y += this.deltaY;

        this.positionText.text = 'Position: ' + Math.round(this.coordinates.x) + ' ,' + Math.round(this.coordinates.y);

        for (let child = 0; child < this.littleStars.children.length; child++) {

            const speed = child / 8;

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

        for (let child = 0; child < this.littleStars1.children.length; child++) {

            const speed = child / 8;

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

        for (let i = 0; i < this.stars.length; i++) {
            this.stars[i].x -= this.deltaX / 6;
            this.stars[i].y -= this.deltaY / 6;
            this.stars[i].visible = true;
            this.coords.text = 'Coords: ' + Math.round(this.stars[i].x) + ' ,' + Math.round(this.stars[i].y);

            this.stars[i].children[3].clear();
            this.stars[i].children[3].lineStyle(1, 0xFFFFFF);

            this.stars[i].children[4].clear();
            this.stars[i].children[4].lineStyle(1, 0xFFFFFF);

            if ( this.stars[i].children[3].hovered ) {
                if ( this.pulseRate < 70) {
                    this.pulseRate += 1.5;
                }
                this.stars[i].children[3].drawCircle(37, 35, this.pulseRate);
                this.stars[i].children[4].drawCircle(37, 35, this.pulseRate / 2);
            }

        }
    }

    gameLoop() {
        requestAnimationFrame(this.gameLoop.bind(this));
        this.update();
        this.renderer.render(this.stage);
    }

    initStars() {

        for (let i = 0; i < 1; i++) {
            const text: string = i % 2 === 0 ? 'assets/imgs/stars/blue_giant120.png' : 'assets/imgs/stars/red_giant120.png';
            this.makeNewStar(text, 'Acheron (LV-426)', {
                x: StarmapComponent.randomInt(window.innerWidth / 2, window.innerWidth / 2),
                y: StarmapComponent.randomInt(window.innerHeight / 2, window.innerHeight / 2)
            });
        }

    }

    makeNewStar(texture: string, name: string, position: { x: number, y: number }) {

        const star = new PIXI.Sprite(this.loader.resources[texture].texture);
        star.scale.set(0.6);
        star.interactive = true;
        // star.buttonMode = true;

        // star name
        const style = new PIXI.TextStyle({
            fill: 0xd3d3d3,
            fontSize: 32
        });

        const basicText = new PIXI.Text(name, style);
        basicText.scale.set(0.43);
        basicText.x = 60;
        basicText.y = -30;

        // star line to name
        const lineToName = new PIXI.Graphics();
        const s = 1;
        const c = 0xd3d3d3;
        lineToName.lineStyle(s, c, .5);
        lineToName.moveTo(50, 20);
        lineToName.lineTo(80, -10);

        const pixiCircle = new PIXI.Graphics();
        pixiCircle.lineStyle(1, 0xFFFFFF);
        pixiCircle.drawCircle(30, 30, 50);
        pixiCircle.endFill();
        pixiCircle.visible = false;

        const pixiCircle1 = new PIXI.Graphics();
        pixiCircle1.lineStyle(1, 0xFFFFFF);
        pixiCircle1.drawCircle(30, 30, 50);
        pixiCircle.endFill();
        pixiCircle1.visible = false;


        const container = new PIXI.Container();
        container.x = position.x;
        container.y = position.y;
        container.addChild(basicText);
        container.addChild(star);
        container.addChild(lineToName);
        container.addChild(pixiCircle);
        container.addChild(pixiCircle1);
        container.visible = false;


        star.on('pointerover', function(){
            pixiCircle.visible = true;
            pixiCircle.hovered = true;
            pixiCircle1.visible = true;
        })
        .on('pointerout', function(){
            pixiCircle.visible = false;
            pixiCircle.hovered = false;
            pixiCircle1.visible = false;
        });

        this.stage.addChild(container);
        this.stars.push(container);
    }

    onNavToSystem(id: number) {
        this.router.navigate(['/system', id]);
    }

}
