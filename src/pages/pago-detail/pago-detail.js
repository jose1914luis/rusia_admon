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
import { NavController, ModalController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { global } from '../../components/credenciales/credenciales';
import { Storage } from '@ionic/storage';
var PagoDetailPage = /** @class */ (function () {
    function PagoDetailPage(modalCtrl, viewCtrl, navCtrl, storage, navParams, alertCtrl) {
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.editable = false;
        this.cargar = false;
        this.visible_list_tour = false;
        this.buscarTour = '';
        this.tours = [];
        this.tours2 = [];
        this.id_tour = 0;
        this.item = this.navParams.get('item');
        console.log(this.item);
        //        this.item.tours_id.name = this.item.tours_id[1];
        //        this.item.tours_id.id = this.item.tours_id[0];
        var dateStart = new Date(this.item.name);
        this.tem_date_begin = dateStart.toISOString();
        var self = this;
        this.storage.get('tours').then(function (tours) {
            console.log(tours);
            self.tours = tours;
            self.tours2 = tours;
        });
    }
    PagoDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PagoDetailPage');
    };
    PagoDetailPage.prototype.editar = function () {
        if (!this.editable) {
            this.editable = true;
        }
        else {
            this.editable = false;
        }
    };
    PagoDetailPage.prototype.onKeyTour = function (e) {
        //        console.log(e);
        if (this.buscarTour.length > 0) {
            this.visible_list_tour = true;
            this.tours = [];
            for (var key in this.tours2) {
                if (String(this.tours2[key].name).toLowerCase().includes(this.buscarTour)) {
                    //                    console.log(this.tours2[key].name);
                    this.tours.push(this.tours2[key]);
                }
            }
        }
        else {
            this.visible_list_tour = false;
        }
        //this.buscar.
    };
    PagoDetailPage.prototype.onCancelTour = function (e) {
        self.
            console.log(e);
        this.visible_list_tour = false;
    };
    PagoDetailPage.prototype.selectTour = function (valor) {
        this.visible_list_tour = false;
        this.buscarTour = valor.name;
        this.id_tour = valor.id;
    };
    PagoDetailPage.prototype.formatDate = function (date) {
        var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    };
    PagoDetailPage.prototype.guardar = function () {
        var self = this;
        this.cargar = true;
        this.storage.get('conexion').then(function (conexion) {
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(function (uid) {
                //                    console.log({
                //                        name: self.formatDate(self.tem_date_begin),
                //                        semana: self.item.semana,
                //                        total_eur: self.item.total_eur,
                //                        total_usd: self.item.total_usd,
                //                        total_res: self.item.total_res,
                //                        total_rub: self.item.total_rub,
                //                        total_metro: self.item.total_metro,
                //                        pax_pago: self.item.pax_pago,
                //                        tours_id: self.id_tour
                //                    });
                console.log(self.item);
                odoo.write('tours.pago.guia', self.item.id, {
                    name: self.formatDate(self.tem_date_begin),
                    semana: self.item.semana,
                    total_eur: self.item.total_eur,
                    total_usd: self.item.total_usd,
                    total_res: self.item.total_res,
                    total_rub: self.item.total_rub,
                    total_metro: self.item.total_metro,
                    pax_pago: self.item.pax_pago,
                }).then(function (value2) {
                    console.log(value2);
                    if (!value2) {
                        self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                    }
                    self.cargar = false;
                    self.closeModal('n');
                }, function () {
                    self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                });
            }, function () {
            });
        });
    };
    PagoDetailPage.prototype.closeModal = function (x) {
        if (x == 'x') {
            this.viewCtrl.dismiss(null);
        }
        else {
            this.viewCtrl.dismiss(x);
        }
    };
    PagoDetailPage.prototype.presentAlert = function (titulo, texto) {
        var alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    };
    PagoDetailPage = __decorate([
        Component({
            selector: 'page-pago-detail',
            templateUrl: 'pago-detail.html',
        }),
        __metadata("design:paramtypes", [ModalController, ViewController, NavController, Storage, NavParams, AlertController])
    ], PagoDetailPage);
    return PagoDetailPage;
}());
export { PagoDetailPage };
//# sourceMappingURL=pago-detail.js.map