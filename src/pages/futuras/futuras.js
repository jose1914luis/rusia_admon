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
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { BuscarTourPage } from '../../pages/buscar-tour/buscar-tour';
var FuturasPage = /** @class */ (function () {
    function FuturasPage(navCtrl, navParams, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.editable = false;
        this.futuras = this.navParams.data.futuras;
        this.tour_id = this.navParams.data.tour_id;
        this.guia_id = this.navParams.data.id;
    }
    FuturasPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ReservasPage');
    };
    FuturasPage.prototype.ejecute = function (item) {
        console.log(item);
        //        this.navCtrl.push(ResDetailPage)
        var profileModal = this.modalCtrl.create(BuscarTourPage, { item: item, guia_id: this.guia_id });
        profileModal.present();
    };
    FuturasPage.prototype.addFuturas = function () {
        //, {item:null, tour_id:this.tour_id, guia_id:this.guia_id}
        var profileModal = this.modalCtrl.create(BuscarTourPage, { item: null, guia_id: this.guia_id });
        profileModal.onDidDismiss(function (data) {
            //            if (data != null) {
            //                this.reservas.push(data);
            //            }
        });
        profileModal.present();
    };
    FuturasPage = __decorate([
        Component({
            selector: 'page-futuras',
            templateUrl: 'futuras.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ModalController])
    ], FuturasPage);
    return FuturasPage;
}());
export { FuturasPage };
//# sourceMappingURL=futuras.js.map