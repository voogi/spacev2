import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {TableOptions} from '../../components/table/table.component';
import {BackendService} from '../../services/backend.service';
import {IOffer} from '../../shared/interface/ioffer';
import {fadeInAnimation} from '../../animations/slide-in-out.animation';

@Component({
  selector: 'space-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css'],
  animations: [fadeInAnimation]
})
export class MarketComponent implements OnInit, OnDestroy {

  @HostBinding('@fadeInAnimation') get fadeInAnimation() {
    return '@fadeInAnimation';
  }

  private offersSubscription: Subscription = new Subscription();

  public tableOptions: TableOptions;

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.offersSubscription = this.backendService.getAllOffers().subscribe(
        (offers: Array<IOffer>) => {
          this.tableOptions = {
            headers : ['id', 'fromType', 'fromValue', 'toType', 'toValue', 'solarSystemId'],
            json : ['id', 'fromType', 'fromValue', 'toType', 'toValue', 'solarSystemId'],
            data : offers
          };
        }
    );
  }

  ngOnDestroy() {
    this.offersSubscription.unsubscribe();
  }

}
