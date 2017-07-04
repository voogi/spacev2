import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {BackendService} from '../../services/backend.service';
import {Subscription} from 'rxjs/Subscription';
import {fadeInAnimation} from '../../animations/slide-in-out.animation';
import {IUser} from '../../shared/interface/iuser';

@Component({
  selector: 'space-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
  animations: [fadeInAnimation]
})
export class LeaderboardComponent implements OnInit, OnDestroy {

  @HostBinding('@fadeInAnimation') get fadeInAnimation() {
    return '@fadeInAnimation';
  }

  private usersSubscription: Subscription = new Subscription();

  public tableOptions: any = { headers: [], data: [], keys: [] };

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.usersSubscription = this.backendService.getAllUsers().subscribe(
        (users: Array<IUser>) => {
          this.tableOptions.headers = ['Name', 'Email', 'Rank'];
          this.tableOptions.data = users;
          this.tableOptions.keys = ['name', 'email', 'rank'];
        }
    );
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }

}
