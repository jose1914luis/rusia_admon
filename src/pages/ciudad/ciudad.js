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
import { CityDetailPage } from '../../pages/city-detail/city-detail';
import { Storage } from '@ionic/storage';
var CiudadPage = /** @class */ (function () {
    function CiudadPage(navCtrl, storage, navParams, alertCtrl) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.cargar = true;
    }
    CiudadPage.prototype.refresh = function () {
        this.cargarConDatos();
    };
    CiudadPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('ciudad_tmp').then(function (ciudad_tmp) {
            if (ciudad_tmp != null) {
                _this.cargarSinDatos();
            }
            else {
                _this.cargarConDatos();
            }
        });
    };
    CiudadPage.prototype.cargarConDatos = function () {
        var self = this;
        this.cargar = true;
        this.storage.get('conexion').then(function (conexion) {
            var odoo = new OdooApi(global.url, conexion.bd);
            self.items = null;
            odoo.login(conexion.username, conexion.password).then(function (uid) {
                console.log(uid);
                if (conexion)
                    //si no es ni guia, ni chofer, ni promotor busco por groups_id
                    //si es 12=administrador, 14=administrador x ciudad, 15 gerente
                    var consulta;
                if (conexion.tipo_a == 'xciudad') {
                    consulta = [['administrador', '=', uid]];
                }
                else {
                    consulta = [['id', '!=', '0']];
                }
                odoo.search_read('tours.companies', consulta, ['administrador', 'name']).then(function (companies) {
                    console.log(companies);
                    var ids = [];
                    for (var key in companies) {
                        ids.push(companies[key].id);
                        companies[key].tours = [];
                    }
                    odoo.search_read('tours', [['company_id', 'in', ids]], ['codigo',
                        'name', 'init_hours', 'end_hours', 'company_id',
                        'no_show', 'pax_maximo', 'price_tour', 'salario_maximo',
                        'gastos_minimos', 'gastos_extra', 'gastos_tour', 'cost_one', 'cost_two', 'cost_three',
                        'cost_four', 'cost_five', 'cost_six', 'cost_seven', 'cost_eight', 'cost_nine', 'cost_ten',
                        'cost_more_ten', 'gasto_one', 'gasto_two', 'gasto_three', 'gasto_four', 'gasto_five', 'gasto_six',
                        'gasto_seven', 'gasto_eight', 'gasto_nine', 'gasto_ten', 'gasto_more_ten', 'is_museo',
                        'porcentaje_museo', 'is_extra', 'is_private', 'is_free', 'description']).then(function (tours) {
                        console.log(tours);
                        for (var key_c in companies) {
                            for (var key_t in tours) {
                                if (companies[key_c].id == tours[key_t].company_id[0]) {
                                    companies[key_c].tours.push(tours[key_t]);
                                }
                            }
                        }
                        console.log(companies);
                        self.storage.set('companies', companies);
                        self.storage.set('ciudad_tmp', 1);
                        self.items = companies;
                        self.cargar = false;
                    }, function () {
                        self.cargarSinDatos();
                    });
                }, function () {
                    self.cargarSinDatos();
                });
            }, function () {
                self.cargarSinDatos();
            });
        });
    };
    CiudadPage.prototype.cargarSinDatos = function () {
        var self = this;
        this.cargar = true;
        this.storage.get('companies').then(function (companies) {
            if (companies != null) {
                self.items = companies;
            }
            else {
                self.presentAlert('Falla', 'Imposible Cargar Datos.');
            }
            self.cargar = false;
        });
    };
    CiudadPage.prototype.presentAlert = function (titulo, texto) {
        var alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    };
    CiudadPage.prototype.ejecute = function (item) {
        this.navCtrl.push(CityDetailPage, { item: item });
    };
    CiudadPage = __decorate([
        Component({
            selector: 'page-ciudad',
            templateUrl: 'ciudad.html',
        }),
        __metadata("design:paramtypes", [NavController, Storage, NavParams, AlertController])
    ], CiudadPage);
    return CiudadPage;
}());
export { CiudadPage };
//# sourceMappingURL=ciudad.js.map