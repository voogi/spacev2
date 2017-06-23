import {Component, OnInit, ElementRef, Output, EventEmitter} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'space-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private mouseEnter: boolean = false;
  private options: any = {};
  private tmhover: any;
  public activePage: number = 0;
  @Output() onChange = new EventEmitter<number>();

  constructor(private elRef: ElementRef) {
    this.options.inverse = false;
    this.options.support = true;
    this.options.speed = 300;
    this.options.hoverDelay = 0;
  }

  ngOnInit() {
  }

  act(event: MouseEvent, id: number) {

    this.onChange.emit(id);
    this.activePage = id;

    const direction = this.getDirection(event.srcElement, { x: event.pageX, y: event.pageY } );
    const styleCSS = this.getStyle( direction );
    const $overlay = $(event.srcElement).find('.menu-overlay');
    const self = this;

    $overlay.hide().css( styleCSS.from );
    clearTimeout( this.tmhover );

    this.tmhover = setTimeout( function() {

      $overlay.show( 0, function() {

        const $el = $( this );
        if ( self.options.support ) {
          $el.css( 'transition', 'all 300ms ease');
        }
        self.applyAnimation( $el, styleCSS.to, self.options.speed );

      } );


    }, self.options.hoverDelay );
  }

  deact(event: MouseEvent) {

    const direction = this.getDirection(event.srcElement, { x: event.pageX, y: event.pageY } );
    const styleCSS = this.getStyle( direction );
    const $overlay = $(event.srcElement).find('.menu-overlay');
    const self = this;

    if ( this.options.support ) {
      $overlay.css( 'transition', this.options.transitionProp );
    }
    clearTimeout( self.tmhover );
    self.applyAnimation( $overlay, styleCSS.from, self.options.speed );
  }

  getDirection(el: any, coord: any) {

    const w = $(el).width(),
        h = $(el).height(),
        top = $(el).offset().top,
        left = $(el).offset().left,

        x = ( coord.x - left - ( w / 2 )) * ( w > h ? ( h /  w  ) : 1 ),
        y = ( coord.y - top - ( h / 2 )) * ( h > w ? ( w  / h  ) : 1 ) ;

    const direction = Math.round(( ( ( Math.atan2(y, x) * (180 / Math.PI) ) + 180 ) / 90 ) + 3) % 4;

    return direction;
  }

  getStyle(direction: any) {
    let fromStyle, toStyle;
    const
      slideFromTop = { left : '0px', top : '-100%' },
      slideFromBottom = { left : '0px', top : '100%' },
      slideFromLeft = { left : '-100%', top : '0px' },
      slideFromRight = { left : '100%', top : '0px' },
      slideTop = { top : '0px' },
      slideLeft = { left : '0px' };

    switch ( direction ) {
      case 0:
        // from top
        fromStyle = !this.options.inverse ? slideFromTop : slideFromBottom;
        toStyle = slideTop;
        break;
      case 1:
        // from right
        fromStyle = !this.options.inverse ? slideFromRight : slideFromLeft;
        toStyle = slideLeft;
        break;
      case 2:
        // from bottom
        fromStyle = !this.options.inverse ? slideFromBottom : slideFromTop;
        toStyle = slideTop;
        break;
      case 3:
        // from left
        fromStyle = !this.options.inverse ? slideFromLeft : slideFromRight;
        toStyle = slideLeft;
        break;
    }

    return { from : fromStyle, to : toStyle };
  }

  applyAnimation(element: any, styleCSS: any, speed: number) {
    // $.fn.applyStyle = this.options.support ? $.fn.css : $.fn.animate;
    $(element).stop().css( styleCSS, $.extend( true, [], { duration : speed + 'ms' } ) );
  }

}
