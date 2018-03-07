var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TourDetailPage } from '../../pages/tour-detail/tour-detail';
import { Storage } from '@ionic/storage';
var CityDetailPage = /** @class */ (function () {
    function CityDetailPage(navCtrl, storage, navParams) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.navParams = navParams;
        this.item = this.navParams.get('item');
    }
    CityDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CityDetailPage');
    };
    CityDetailPage.prototype.ejecute = function (item) {
        this.navCtrl.push(TourDetailPage, { item: item });
    };
    CityDetailPage.prototype.nuevo = function () {
        this.navCtrl.push(TourDetailPage, {
            item: null
        });
    };
    CityDetailPage = __decorate([
        Component({
            selector: 'page-city-detail',
            templateUrl: 'city-detail.html',
        }),
        __metadata("design:paramtypes", [NavController, Storage, NavParams])
    ], CityDetailPage);
    return CityDetailPage;
}());
export { CityDetailPage };
//# sourceMappingURL=city-detail.js.map