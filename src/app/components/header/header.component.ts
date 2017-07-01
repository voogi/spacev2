import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'space-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private menuItems: Array<{ name: string , route: string}>;

  constructor( private router: Router) {
    this.menuItems = [
      {
        name: 'starmap',
        route: '/starmap'
      }
    ];
  }

  onNavigate(route: string) {
    this.router.navigate([route]);
  }

  ngOnInit() {

  }


}
