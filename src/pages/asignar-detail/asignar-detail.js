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
import { NavController, NavParams, AlertController, ModalController, ViewController } from 'ionic-angular';
import { global } from '../../components/credenciales/credenciales';
import { Storage } from '@ionic/storage';
import { BuscarTourPage } from '../../pages/buscar-tour/buscar-tour';
import { BuscarGuiaPage } from '../../pages/buscar-guia/buscar-guia';
var AsignarDetailPage = /** @class */ (function () {
    function AsignarDetailPage(viewCtrl, modalCtrl, navCtrl, storage, navParams, alertCtrl) {
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.editable = false;
        this.no_editable = true;
        this.cargar = false;
        this.nuevo = false;
        this.tem_date_end = new Date().toISOString();
        this.tem_date_begin = new Date().toISOString();
        console.log(this.navParams.data);
        if (this.navParams.data != false) {
            this.item = this.navParams.data;
            if (this.item.guia_id != "")
                this.item.guia_id.name = this.item.guia_id[1];
            this.item.tour_id.name = this.item.tour_id[1];
            this.no_editable = this.item.no_editable;
            //            this.tem_date_begin = this.item
        }
        else {
            this.editable = true;
            this.nuevo = true;
            this.item = {
                id: '',
                tour_id: { id: '', name: '' },
                guia_id: { id: '', name: '' },
                date_end: '',
                date_begin: '',
                entregado: '',
                personas_pago: '',
                personas_terceros: '',
                personas_all_in: '',
                total_personas: '',
                total_euro_res: '',
                total_dolar_res: '',
                total_rublo_res: '',
                pay_pal: '',
                tarjeta: '',
                observaciones: ''
            };
        }
    }
    AsignarDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AsignarDetailPage');
    };
    AsignarDetailPage.prototype.buscarGuia = function () {
        if (this.editable && this.no_editable) {
            var self = this;
            var profileModal = this.modalCtrl.create(BuscarGuiaPage);
            profileModal.onDidDismiss(function (data) {
                if (data != null) {
                    self.item.guia_id = data;
                    console.log(self.item.guia_id.name);
                }
            });
            profileModal.present();
        }
    };
    AsignarDetailPage.prototype.buscarTour = function () {
        if (this.editable && this.no_editable) {
            var self = this;
            var profileModal = this.modalCtrl.create(BuscarTourPage);
            profileModal.onDidDismiss(function (data) {
                if (data != null) {
                    self.item.tour_id = data;
                    console.log(self.item.tour_id.name);
                }
            });
            profileModal.present();
        }
    };
    AsignarDetailPage.prototype.editar = function () {
        if (!this.editable) {
            this.editable = true;
        }
        else {
            this.editable = false;
        }
    };
    AsignarDetailPage.prototype.guardar = function () {
        this.cargar = true;
        var self = this;
        var dato = {
            date_begin: self.item.date_begin, date_end: self.item.date_end, personas_pago: self.item.personas_pago,
            personas_terceros: self.item.personas_terceros, personas_all_in: self.item.personas_all_in,
            total_personas: self.item.total_personas, total_rublo: self.item.total_rublo, total_euro: self.item.total_euro,
            total_dolar: self.item.total_dolar, pay_pal: self.item.pay_pal, tarjeta: self.item.tarjeta,
            entregado: self.item.entregado, state: self.item.state, observaciones: self.item.observaciones
        };
        this.storage.get('conexion').then(function (conexion) {
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(function (uid) {
                odoo.write('tours.guia', self.item.id, dato).then(function (value2) {
                    console.log(value2);
                    if (!value2) {
                        self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                    }
                    self.cargar = false;
                    //                            self.viewCtrl.dismiss();
                }, function () {
                    self.apilar(dato, self.item.id);
                });
            }, function () {
                self.apilar(dato, self.item.id);
            });
        });
    };
    AsignarDetailPage.prototype.apilar = function (dato, id) {
        var self = this;
        var registro = {
            operacion: 'write',
            tabla: 'tours.guia',
            dato: dato,
            id: id
        };
        self.storage.get('offline').then(function (offline) {
            if (offline != null) {
                offline.push(registro);
            }
            else {
                var pila = [];
                pila.push(registro);
                self.storage.set('offline', pila);
            }
        });
    };
    AsignarDetailPage.prototype.presentAlert = function (titulo, texto) {
        var alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    };
    AsignarDetailPage.prototype.calcular = function () {
        this.item.total_personas = parseInt(this.item.personas_pago) + parseInt(this.item.personas_terceros) + parseInt(this.item.personas_all_in);
    };
    AsignarDetailPage = __decorate([
        Component({
            selector: 'page-asignar-detail',
            templateUrl: 'asignar-detail.html',
        }),
        __metadata("design:paramtypes", [ViewController, ModalController, NavController, Storage, NavParams, AlertController])
    ], AsignarDetailPage);
    return AsignarDetailPage;
}());
export { AsignarDetailPage };
//# sourceMappingURL=asignar-detail.js.map