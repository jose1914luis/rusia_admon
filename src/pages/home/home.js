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
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { global } from '../../components/credenciales/credenciales';
import { Storage } from '@ionic/storage';
import { GastosFilterPage } from '../../pages/gastos-filter/gastos-filter';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, modalCtrl, storage, alertCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.mensaje = '';
    }
    HomePage.prototype.ejecute = function (item) {
        var self = this;
        var profileModal = this.modalCtrl.create(GastosFilterPage, { item: item });
        profileModal.onDidDismiss(function (data) {
            if (data != null) {
                self.cargarConDatos();
            }
        });
        profileModal.present();
        //        this.navCtrl.push(GastosFilterPage, {item: item});
    };
    HomePage.prototype.ionViewDidLoad = function () {
        this.cargarConDatos();
    };
    HomePage.prototype.cargarConDatos = function () {
        this.cargar = true;
        var self = this;
        this.items = null;
        this.storage.get('conexion').then(function (conexion) {
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(function (uid) {
                odoo.search_read('tours.gastos.diversos', [['id', '<>', '0']], ['name', 'city_id', 'total_usd', 'total_eur', 'total_rub', 'total_pp', 'total_tarjeta',
                    'state', 'conceptos_ids']).then(function (gastos) {
                    //console.log(gastos);
                    gastos;
                    var ids = [];
                    for (var key in gastos) {
                        gastos[key].visible = true;
                        gastos[key].conceptos = [];
                        ids.push(gastos[key].id);
                    }
                    odoo.search_read('tours.gastos.conceptos', [['gastos_id', 'in', ids]], ['concepto', 'moneda', 'price_unit', 'unidades', 'sub_total', 'gastos_id']).then(function (conceptos) {
                        console.log(conceptos);
                        for (var key_g in gastos) {
                            for (var key in gastos[key_g].conceptos_ids) {
                                for (var key_c in conceptos) {
                                    if (conceptos[key_c].id == gastos[key_g].conceptos_ids[key]) {
                                        gastos[key_g].conceptos.push(conceptos[key_c]);
                                    }
                                }
                            }
                        }
                        self.items = gastos;
                        self.storage.set('gastos', gastos);
                        console.log(self.items);
                        self.cargar = false;
                    }, function () {
                        self.presentAlert('Falla', 'Imposible Conectar');
                    });
                    //                            
                }, function () {
                    self.cargarSinDatos();
                });
            }, function () {
                self.cargarSinDatos();
            });
        });
    };
    HomePage.prototype.cargarSinDatos = function () {
        this.cargar = true;
        var self = this;
        this.items = null;
        this.storage.get('gastos').then(function (gastos) {
            if (gastos != null) {
                self.items = gastos;
                self.cargar = false;
            }
            else {
                self.presentAlert('Falla', 'Imposible cargar los datos');
            }
        });
    };
    HomePage.prototype.buscar = function () {
        var self = this;
        var alert = this.alertCtrl.create({
            title: 'Buscar',
            inputs: [
                {
                    name: 'ciudad',
                    placeholder: 'Ciudad'
                },
                {
                    name: 'fechaIni',
                    placeholder: 'Fecha Inicial'
                },
                {
                    name: 'fechaFin',
                    placeholder: 'Fecha Final'
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
                        for (var key in self.items) {
                            self.items[key].visible = false;
                            //                                console.log((self.items[key].name + "").includes(data.nombre + "") + '  ' + (self.items[key].email[1] + "").includes(data.correo + ""));
                            if ((self.items[key].city_id[1] + "").includes(data.ciudad + "")) {
                                //                                    console.log(self.items[key]);
                                self.items[key].visible = true;
                            }
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage.prototype.presentAlert = function (titulo, texto) {
        var alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    };
    HomePage.prototype.refresh = function () {
        this.ionViewDidLoad();
    };
    HomePage.prototype.nuevo = function () {
        var self = this;
        var profileModal = this.modalCtrl.create(GastosFilterPage, { item: null });
        profileModal.onDidDismiss(function (data) {
            if (data != null) {
                self.cargarConDatos();
            }
        });
        profileModal.present();
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController, ModalController, Storage, AlertController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map