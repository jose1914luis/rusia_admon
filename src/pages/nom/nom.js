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
import { NomDetailPage } from '../../pages/nom-detail/nom-detail';
import { NomFilterPage } from '../../pages/nom-filter/nom-filter';
import { Storage } from '@ionic/storage';
var NomPage = /** @class */ (function () {
    function NomPage(modalCtrl, storage, navCtrl, navParams, alertCtrl) {
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.cargar = true;
    }
    NomPage.prototype.ionViewDidLoad = function () {
        this.cargarSinDatos();
    };
    NomPage.prototype.cargarConDatos = function () {
        var self = this;
        this.storage.get('conexion').then(function (conexion) {
            self.cargar = true;
            self.items = null;
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(function (uid) {
                odoo.search_read('tours.nomina', [['id', '!=', '0']], ['name', 'semana', 'city_id', 'pax_pago', 'total_rub',
                    'total_eur', 'total_usd', 'total_res', 'total_metro', 'state']).then(function (nomina) {
                    var ids = [];
                    for (var key in nomina) {
                        nomina[key].visible = true;
                        ids.push(nomina[key].semana);
                        nomina[key].pago = [];
                    }
                    odoo.search_read('tours.pago.guia', [['semana', 'in', ids]], ['name', 'semana', 'tours_id', 'guia_user_id', 'city_id',
                        'pax_pago', 'total_rub', 'total_eur', 'total_usd', 'total_res', 'total_metro', 'concepto', 'state']).then(function (pago) {
                        console.log(pago);
                        for (var key_no in nomina) {
                            for (var key_p in pago) {
                                if (nomina[key_no].semana == pago[key_p].semana) {
                                    pago[key_p].tours_id.name = pago[key_p].tours_id[1];
                                    pago[key_p].tours_id.id = pago[key_p].tours_id[0];
                                    nomina[key_no].pago.push({
                                        pago_id: pago[key_p].id,
                                        name: pago[key_p].name,
                                        dateStart: new Date(pago[key_p].name).toISOString(),
                                        semana: pago[key_p].semana,
                                        tours_id: pago[key_p].tours_id,
                                        guia_user_id: pago[key_p].guia_user_id[1],
                                        city_id: pago[key_p].city_id,
                                        pax_pago: pago[key_p].pax_pago,
                                        total_rub: pago[key_p].total_rub,
                                        total_eur: pago[key_p].total_eur,
                                        total_usd: pago[key_p].total_usd,
                                        total_res: pago[key_p].total_res,
                                        total_metro: pago[key_p].total_metro,
                                        concepto: pago[key_p].concepto,
                                        state: pago[key_p].state,
                                    });
                                }
                            }
                        }
                        console.log(nomina);
                        self.items = nomina;
                        self.storage.set('nomina', self.items);
                        self.cargar = false;
                    }, function () {
                        self.presentAlert('Falla', 'Imposible Cargar Datos.');
                        self.cargar = false;
                    });
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
    NomPage.prototype.cargarSinDatos = function () {
        var self = this;
        this.storage.get('nomina').then(function (nomina) {
            if (nomina != null) {
                self.items = nomina;
                self.cargar = false;
            }
            else {
                self.cargarConDatos();
            }
        });
    };
    NomPage.prototype.presentAlert = function (titulo, texto) {
        var alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    };
    NomPage.prototype.ejecute = function (item) {
        //        console.log(NomDetailPage);
        this.navCtrl.push(NomDetailPage, { item: item });
    };
    NomPage.prototype.refresh = function () {
        this.cargarConDatos();
    };
    NomPage.prototype.buscar = function () {
        var self = this;
        var profileModal = this.modalCtrl.create(NomFilterPage);
        profileModal.onDidDismiss(function (data) {
            if (data != null) {
                if (data.semanaIni > 0 || data.semanaFin > 0) {
                    for (var key in self.items) {
                        self.items[key].visible = false;
                        if (self.items[key].semana >= data.semanaIni && self.items[key].semana <= data.semanaFin) {
                            if (data.estado = 'todos') {
                                self.items[key].visible = true;
                            }
                            else if (data.estado = 'pagados' && self.items[key].state == 'pagado') {
                                self.items[key].visible = true;
                            }
                            else if (data.estado = 'pedientes' && self.items[key].state == 'pedientes') {
                                self.items[key].visible = true;
                            }
                        }
                    }
                }
                else {
                    for (var key in self.items) {
                        self.items[key].visible = true;
                    }
                }
            }
        });
        profileModal.present();
    };
    NomPage = __decorate([
        Component({
            selector: 'page-nom',
            templateUrl: 'nom.html',
        }),
        __metadata("design:paramtypes", [ModalController, Storage, NavController, NavParams, AlertController])
    ], NomPage);
    return NomPage;
}());
export { NomPage };
//# sourceMappingURL=nom.js.map