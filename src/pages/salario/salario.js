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
import { SalarioDetailPage } from '../../pages/salario-detail/salario-detail';
import { Storage } from '@ionic/storage';
var SalarioPage = /** @class */ (function () {
    function SalarioPage(navCtrl, modalCtrl, storage, navParams, alertCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.mensaje = '';
    }
    SalarioPage.prototype.ionViewDidLoad = function () {
        this.cargarSinDatos();
    };
    SalarioPage.prototype.cargarConDatos = function () {
        this.cargar = true;
        var self = this;
        this.items = null;
        this.storage.get('conexion').then(function (conexion) {
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(function (uid) {
                odoo.search_read('tours.gastos.generales', [['id', '!=', '0']], ['name', 'sala_guia', 'city_id', 'total_metro']).then(function (generales) {
                    console.log(generales);
                    self.items = generales;
                    self.storage.set('generales', generales);
                    self.cargar = false;
                }, function () {
                    self.cargarSinDatos();
                });
            }, function () {
                self.presentAlert('Falla', 'Imposible Cargar Datos.');
                self.cargar = false;
            });
        });
    };
    SalarioPage.prototype.cargarSinDatos = function () {
        this.cargar = true;
        var self = this;
        this.items = null;
        this.storage.get('generales').then(function (generales) {
            if (generales != null) {
                console.log(generales);
                self.items = generales;
                self.cargar = false;
            }
            else {
                self.cargarConDatos();
            }
        });
    };
    SalarioPage.prototype.presentAlert = function (titulo, texto) {
        var alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    };
    SalarioPage.prototype.ejecute = function (item) {
        item.nuevo = true;
        item.editable = false;
        //        this.navCtrl.push(SalarioDetailPage, {item: item});
        var self = this;
        var profileModal = this.modalCtrl.create(SalarioDetailPage, { item: item });
        profileModal.onDidDismiss(function (data) {
            if (data != null) {
                self.cargarConDatos();
            }
        });
        profileModal.present();
    };
    SalarioPage.prototype.nuevo = function () {
        var self = this;
        var profileModal = this.modalCtrl.create(SalarioDetailPage, { item: null });
        profileModal.onDidDismiss(function (data) {
            if (data != null) {
                self.cargarConDatos();
            }
        });
        profileModal.present();
        //        this.navCtrl.push(SalarioDetailPage, {item: null});
    };
    SalarioPage.prototype.refresh = function () {
        this.cargarConDatos();
    };
    SalarioPage = __decorate([
        Component({
            selector: 'page-salario',
            templateUrl: 'salario.html',
        }),
        __metadata("design:paramtypes", [NavController, ModalController, Storage, NavParams, AlertController])
    ], SalarioPage);
    return SalarioPage;
}());
export { SalarioPage };
//# sourceMappingURL=salario.js.map