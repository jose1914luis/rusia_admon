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
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
var BuscarGuiaPage = /** @class */ (function () {
    function BuscarGuiaPage(viewCtrl, navCtrl, navParams, storage) {
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.guias = [];
        this.guias2 = [];
        this.buscar = '';
        this.shouldShowCancel = true;
        var self = this;
        this.storage.get('guias').then(function (guias) {
            self.guias = guias;
            self.guias2 = guias;
        });
    }
    BuscarGuiaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BuscarTourPage');
    };
    BuscarGuiaPage.prototype.onInput = function (e) {
        console.log(e);
        this.guias = [];
        for (var key in this.guias2) {
            if (String(this.guias2[key].name).toLowerCase().includes(this.buscar)) {
                console.log(this.guias2[key].name);
                this.guias.push(this.guias2[key]);
            }
        }
        //this.buscar.
    };
    BuscarGuiaPage.prototype.onCancel = function (e) {
        console.log(e);
    };
    BuscarGuiaPage.prototype.closeModal = function (x) {
        if (x == 'x') {
            this.viewCtrl.dismiss(null);
        }
        else {
            this.viewCtrl.dismiss(x);
        }
    };
    BuscarGuiaPage = __decorate([
        Component({
            selector: 'page-buscar-guia',
            templateUrl: 'buscar-guia.html',
        }),
        __metadata("design:paramtypes", [ViewController, NavController, NavParams, Storage])
    ], BuscarGuiaPage);
    return BuscarGuiaPage;
}());
export { BuscarGuiaPage };
//# sourceMappingURL=buscar-guia.js.map