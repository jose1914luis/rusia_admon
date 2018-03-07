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
import { NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { global } from '../../components/credenciales/credenciales';
import { Storage } from '@ionic/storage';
var SalarioDetailPage = /** @class */ (function () {
    function SalarioDetailPage(navCtrl, viewCtrl, storage, navParams, alertCtrl) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.storage = storage;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.cargar = false;
        this.ciudadList = [];
        if (this.navParams.get('item') != null) {
            this.item = this.navParams.get('item');
            this.item.nuevo = false;
        }
        else {
            this.item = {
                name: '', city_id: ['', ''], sala_guia: '', total_metro: '',
                nuevo: true, editable: true
            };
        }
        var self = this;
        this.storage.get('companies').then(function (ciudad) {
            console.log(ciudad);
            self.ciudadList = ciudad;
            self.ciudad = ciudad[0].name[0];
        });
    }
    SalarioDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SalarioDetailPage');
    };
    SalarioDetailPage.prototype.editar = function () {
        if (!this.item.editable) {
            this.item.editable = true;
        }
        else {
            this.item.editable = false;
        }
    };
    SalarioDetailPage.prototype.closeModal = function (x) {
        if (x == 'x') {
            this.viewCtrl.dismiss(null);
        }
        else {
            this.viewCtrl.dismiss(x);
        }
    };
    SalarioDetailPage.prototype.guardar = function () {
        this.cargar = true;
        var self = this;
        this.storage.get('conexion').then(function (conexion) {
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(function (uid) {
                if (self.item.nuevo) {
                    console.log('nuevo');
                    console.log({
                        sala_guia: self.item.sala_guia,
                        total_metro: self.item.total_metro,
                        name: self.item.name,
                        city_id: self.ciudad
                    });
                    odoo.create('tours.gastos.generales', {
                        sala_guia: self.item.sala_guia,
                        total_metro: self.item.total_metro,
                        name: self.item.name,
                        city_id: self.ciudad
                    }).then(function (value2) {
                        if (!value2) {
                            self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                        }
                        self.cargar = false;
                        self.closeModal('n');
                    }, function () {
                        self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                    });
                }
                else {
                    console.log('editar');
                    console.log({
                        sala_guia: self.item.sala_guia,
                        total_metro: self.item.total_metro,
                        name: self.item.name,
                        city_id: self.ciudad
                    });
                    odoo.write('tours.gastos.generales', self.item.id, {
                        sala_guia: self.item.sala_guia,
                        total_metro: self.item.total_metro,
                        name: self.item.name,
                        city_id: self.ciudad
                    }).then(function (value2) {
                        if (!value2) {
                            self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                        }
                        self.cargar = false;
                        self.closeModal('n');
                    }, function () {
                        self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                    });
                }
            }, function () {
            });
        });
    };
    SalarioDetailPage.prototype.presentAlert = function (titulo, texto) {
        var alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    };
    SalarioDetailPage = __decorate([
        Component({
            selector: 'page-salario-detail',
            templateUrl: 'salario-detail.html',
        }),
        __metadata("design:paramtypes", [NavController, ViewController, Storage, NavParams, AlertController])
    ], SalarioDetailPage);
    return SalarioDetailPage;
}());
export { SalarioDetailPage };
//# sourceMappingURL=salario-detail.js.map