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
/**
 * Generated class for the SincPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SincPage = /** @class */ (function () {
    function SincPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.item = {
            name: '',
            email: '',
            telefono: '',
            hotel: '',
            is_padrino: '',
            es_tarjeta: '',
            es_pay_pal: '',
            gracias: '',
            observaciones: ''
        };
    }
    SincPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SincPage');
    };
    SincPage = __decorate([
        Component({
            selector: 'page-sinc',
            templateUrl: 'sinc.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], SincPage);
    return SincPage;
}());
export { SincPage };
//# sourceMappingURL=sinc.js.map