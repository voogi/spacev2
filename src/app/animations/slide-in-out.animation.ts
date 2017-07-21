import { trigger, state, animate, transition, style } from '@angular/animations';

export const slideInOutAnimation =
  trigger('slideInOutAnimation', [

    // end state styles for route container (host)
    state('*', style({
      // the view covers the whole screen with a semi tranparent background
      position: 'fixed',
      top: 200,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)'
    })),

    // route 'enter' transition
    transition(':enter', [

      // styles at start of transition
      style({
        // start with the content positioned off the right of the screen,
        // -400% is required instead of -100% because the negative position adds to the width of the element
        right: '-400%',

        // start with background opacity set to 0 (invisible)
        backgroundColor: 'rgba(0, 0, 0, 0)'
      }),

      // animation and styles at end of transition
      animate('.5s ease-in-out', style({
        // transition the right position to 0 which slides the content into view
        right: 0,

        // transition the background opacity to 0.8 to fade it in
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
      }))
    ]),

    // route 'leave' transition
    transition(':leave', [
      // animation and styles at end of transition
      animate('.5s ease-in-out', style({
        // transition the right position to -400% which slides the content out of view
        right: '-400%',

        // transition the background opacity to 0 to fade it out
        backgroundColor: 'rgba(0, 0, 0, 0)'
      }))
    ])
  ]);


// export const fadeInAnimation =
//   trigger('fadeInAnimation', [
//
//     // state('in', style({
//     //   opacity : 1
//     // })),
//
//     // route 'enter' transition
//     transition(':enter', [
//
//       // styles at start of transition
//       style({ transform : 'translateX(-100%)' }),
//
//       // animation and styles at end of transition
//       animate('3s', style({ transform: 'translateX(0)' }))
//     ]),
//
//
//     transition(':leave', [
//       // styles at start of transition
//       style({ transform: 'translateX(0)' }),
//       // animation and styles at end of transition
//       animate('3s', style({ transform: 'translateX(-100%)' }))
//     ])
//
//   ]);

export const fadeInAnimation2 =
  trigger('fadeInAnimation2', [
    // state('void', style({opacity : 0}) ),
    // state('*', style({opacity : 1}) ),
    transition(':enter', [  // before 2.1: transition('void => *', [
      style({opacity : 0}),
      animate('0.3s ease-in-out', style({opacity : 1}))
    ]),
    transition(':leave', [  // before 2.1: transition('* => void', [
      style({opacity : 1}),
      animate('0.3s ease-in-out', style({opacity : 0}))
    ])
  ]);

export const fadeInAnimation =
    trigger('fadeInAnimation', [
        // route 'enter' transition
        transition(':enter', [

            // styles at start of transition
            style({ opacity: 0 }),

            // animation and styles at end of transition
            animate('3s', style({ opacity: 1 }))
        ]),
    ]);
