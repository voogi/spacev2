import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'space-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public menuItems: Array<{ name: string , route: string}>;

  constructor( private router: Router) {
    this.menuItems = [
      {
        name: 'starmap',
        route: '/starmap'
      },
      {
        name: "system",
        route: "/system"
      },
      {
        name: 'leaderboard',
        route: '/leaderboard'
      },
      {
        name: 'market',
        route: '/market'
      },
      {
        name: "clan",
        route: "/clan"
      },
      {
        name: "profile",
        route: "/profile"
      }
    ];
  }

  onNavigate(route: string) {
    this.router.navigate([route]);
  }

  ngOnInit() {

  }


}
