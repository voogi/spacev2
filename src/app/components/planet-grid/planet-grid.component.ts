import {AfterContentInit, Component, ElementRef, Input, OnInit} from '@angular/core';

@Component({
  selector: 'space-planet-grid',
  templateUrl: './planet-grid.component.html',
  styleUrls: ['./planet-grid.component.css']
})
export class PlanetGridComponent implements OnInit, AfterContentInit {

  @Input() options: any;
  constructor(private  elementRef: ElementRef) {}

  ngOnInit(){

    this.build();

  }

  ngAfterContentInit (){

  }

  build(){

    let html = '';

    for( let row = 0; row < this.options.rows; row++ ){
      html += '<div class="grid-row">';
      for( let col = 0; col < this.options.cols; col++ ){
        html += '<div class="grid-col"><div class="tile"></div></div>';
      }
      html += '</div>';
    }

    this.elementRef.nativeElement.children[0].innerHTML = html;


  }

}
