import {Component, Input, OnInit} from '@angular/core';
import {Store} from '../store.model';
import {StoreService} from '../store.service';
import {LoginService} from '../../login/login.service';
import {isUndefined} from 'util';
import {HomeServerService} from '../../homeServer.service';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.css']
})
export class StoreDetailComponent implements OnInit {
  @Input() store: Store;

  constructor(private storeService: StoreService, private loginService: LoginService , private homeServerService: HomeServerService) {
  }

  path: string;

  ngOnInit() {
    this.path = this.store.imagePath[0];
  }

  onAddToCartList() {
    if (this.loginService.IsSignedIn()) {
      this.storeService.addItemsToCartList(this.store);
    } else {
      alert('You are not signed in');
    }
  }

  viewCart() {
    if (!this.loginService.IsSignedIn()) {
      alert('You are not signed in');
    }
  }
  DeleteCar() {
    const index = this.storeService.cars.indexOf(this.store);
    this.storeService.cars.splice(index , 1);
    this.storeService.storeChanged.next(this.storeService.getCars());
    this.homeServerService.storeServers(this.storeService.getCars()).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
    this.Cancel();
    alert('The car has been deleted');
  }
  Cancel() {
    this.storeService.emitCar(null);
  }
  Next() {
    this.storeService.emitNextCar(this.store);
  }
  Previous() {
    this.storeService.emitPrevCar(this.store);
  }
  OnNext() {
    if ( isUndefined(this.store.imagePath[1])) {
      this.path = this.store.imagePath[0];
    }else {
      this.path = this.store.imagePath[1];
    }
  }
  OnPrev() {
    if ( isUndefined(this.store.imagePath[0])) {
      this.path = this.store.imagePath[1];
    }else {
      this.path = this.store.imagePath[0];
    }
  }
}
