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
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { global } from '../../components/credenciales/credenciales';
import { Storage } from '@ionic/storage';
var TourDetailPage = /** @class */ (function () {
    function TourDetailPage(navCtrl, storage, navParams, alertCtrl) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.editable = false;
        this.cargar = false;
        this.item = this.navParams.get('item');
        if (this.item == null) {
            this.item = {
                company_id: ['', ''],
                codigo: '',
                name: '', init_hours: '',
                end_hours: '',
                no_show: '', pax_maximo: '',
                price_tour: '', salario_maximo: '',
                gastos_minimos: '', gastos_extra: '',
                gastos_tour: '', cost_one: '',
                cost_two: '', cost_three: '',
                cost_four: '', cost_five: '',
                cost_six: '', cost_seven: '',
                cost_eight: '', cost_nine: '',
                cost_ten: '', cost_more_ten: '',
                gasto_one: '', gasto_two: '',
                gasto_three: '', gasto_four: '',
                gasto_five: '', gasto_six: '',
                gasto_seven: '', gasto_eight: '',
                gasto_nine: '', gasto_ten: '',
                gasto_more_ten: '', is_museo: '',
                porcentaje_museo: '', is_extra: '',
                is_private: '', is_free: '', description: ''
            };
        }
    }
    TourDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TourDetailPage');
    };
    TourDetailPage.prototype.editar = function () {
        if (!this.editable) {
            this.editable = true;
        }
        else {
            this.editable = false;
        }
    };
    TourDetailPage.prototype.guardar = function () {
        this.cargar = true;
        var self = this;
        this.storage.get('conexion').then(function (conexion) {
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(function (uid) {
                odoo.write('tours', self.item.id, {
                    codigo: self.item.codigo,
                    name: self.item.name, init_hours: self.item.init_hours,
                    end_hours: self.item.end_hours,
                    no_show: self.item.no_show, pax_maximo: self.item.pax_maximo,
                    price_tour: self.item.price_tour, salario_maximo: self.item.salario_maximo,
                    gastos_minimos: self.item.gastos_minimos, gastos_extra: self.item.gastos_extra,
                    gastos_tour: self.item.gastos_tour, cost_one: self.item.cost_one,
                    cost_two: self.item.cost_two, cost_three: self.item.cost_three,
                    cost_four: self.item.cost_four, cost_five: self.item.cost_five,
                    cost_six: self.item.cost_six, cost_seven: self.item.cost_seven,
                    cost_eight: self.item.cost_eight, cost_nine: self.item.cost_nine,
                    cost_ten: self.item.cost_ten, cost_more_ten: self.item.cost_more_ten,
                    gasto_one: self.item.gasto_one, gasto_two: self.item.gasto_two,
                    gasto_three: self.item.gasto_three, gasto_four: self.item.gasto_four,
                    gasto_five: self.item.gasto_five, gasto_six: self.item.gasto_six,
                    gasto_seven: self.item.gasto_seven, gasto_eight: self.item.gasto_eight,
                    gasto_nine: self.item.gasto_nine, gasto_ten: self.item.gasto_ten,
                    gasto_more_ten: self.item.gasto_more_ten, is_museo: self.item.is_museo,
                    porcentaje_museo: self.item.porcentaje_museo, is_extra: self.item.is_extra,
                    is_private: self.item.is_private, is_free: self.item.is_free, description: self.item.description
                }).then(function (value2) {
                    if (!value2) {
                        self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                    }
                    self.cargar = false;
                    //console.log(value2);
                }, function () {
                    self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                });
            }, function () {
            });
        });
    };
    TourDetailPage.prototype.presentAlert = function (titulo, texto) {
        var alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    };
    TourDetailPage = __decorate([
        Component({
            selector: 'page-tour-detail',
            templateUrl: 'tour-detail.html',
        }),
        __metadata("design:paramtypes", [NavController, Storage, NavParams, AlertController])
    ], TourDetailPage);
    return TourDetailPage;
}());
export { TourDetailPage };
//# sourceMappingURL=tour-detail.js.map