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
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { global } from '../../components/credenciales/credenciales';
import { PagoDetailPage } from '../../pages/pago-detail/pago-detail';
import { Storage } from '@ionic/storage';
var PagoPage = /** @class */ (function () {
    function PagoPage(modalCtrl, navCtrl, storage, navParams, alertCtrl) {
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.cargar = true;
    }
    PagoPage.prototype.ionViewDidLoad = function () {
        this.cargarSinDatos();
    };
    PagoPage.prototype.cargarConDatos = function () {
        var self = this;
        this.storage.get('conexion').then(function (conexion) {
            self.cargar = true;
            self.items = null;
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(function (uid) {
                odoo.search_read('tours.pago.guia', [['id', '!=', '0']], ['name', 'semana', 'tours_id', 'guia_user_id', 'city_id',
                    'total_eur', 'total_usd', 'total_res', 'total_rub', 'total_metro', 'pax_pago', 'state', 'concepto'], null, null, 'id desc').then(function (pago) {
                    console.log(pago);
                    self.items = pago;
                    for (var key in self.items) {
                        self.items[key].visible = true;
                    }
                    self.storage.set('pago', self.items);
                    self.cargar = false;
                }, function () {
                    self.presentAlert('Falla', 'Imposible Cargar Datos.');
                    self.cargar = false;
                });
            }, function () {
                self.presentAlert('Falla', 'Imposible Cargar Datos.');
                self.cargar = false;
            });
        });
    };
    PagoPage.prototype.cargarSinDatos = function () {
        var self = this;
        self.cargar = true;
        self.items = null;
        this.storage.get('pago').then(function (pago) {
            if (pago != null) {
                //console.log(pago);
                self.items = pago;
                for (var key in self.items) {
                    self.items[key].visible = true;
                }
                self.cargar = false;
            }
            else {
                self.cargarConDatos();
            }
        });
    };
    PagoPage.prototype.presentAlert = function (titulo, texto) {
        var alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    };
    PagoPage.prototype.ejecute = function (item) {
        //        this.navCtrl.push(PagoDetailPage, {item: item});
        var self = this;
        var profileModal = this.modalCtrl.create(PagoDetailPage, { item: item });
        profileModal.onDidDismiss(function (data) {
            if (data != null) {
                self.cargarConDatos();
            }
        });
        profileModal.present();
    };
    PagoPage.prototype.refresh = function () {
        this.cargarConDatos();
    };
    PagoPage.prototype.buscar = function () {
        var self = this;
        var alert = this.alertCtrl.create({
            title: 'Buscar Pago Diario',
            inputs: [
                {
                    name: 'semIni',
                    placeholder: 'Semana Inicial'
                },
                {
                    name: 'semFin',
                    placeholder: 'Semana Final'
                },
                {
                    name: 'fechaIni',
                    placeholder: 'Fecha Inicial (YYYY-MM-DD)'
                },
                {
                    name: 'fechaFin',
                    placeholder: 'Fecha Final (YYYY-MM-DD)'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Buscar',
                    handler: function (data) {
                        if (data.semIni.length > 0 || data.semFin.length > 0 || data.fechaIni.length > 0 || data.fechaFin.length > 0) {
                            for (var key in self.items) {
                                self.items[key].visible = false;
                                var fechaIni = new Date(data.fechaIni);
                                var fechaFin = new Date(data.fechaFin);
                                var fecha = new Date(self.items[key].name);
                                if (self.items[key].semana >= data.semIni && self.items[key].semana <= data.semFin) {
                                    self.items[key].visible = true;
                                }
                                if (fecha >= fechaIni && fecha <= fechaFin) {
                                    self.items[key].visible = true;
                                }
                            }
                        }
                        else {
                            for (var key in self.items) {
                                self.items[key].visible = true;
                            }
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    PagoPage = __decorate([
        Component({
            selector: 'page-pago',
            templateUrl: 'pago.html',
        }),
        __metadata("design:paramtypes", [ModalController, NavController, Storage, NavParams, AlertController])
    ], PagoPage);
    return PagoPage;
}());
export { PagoPage };
//# sourceMappingURL=pago.js.map