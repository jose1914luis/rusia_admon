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
var GastosFilterPage = /** @class */ (function () {
    function GastosFilterPage(viewCtrl, navCtrl, storage, navParams, alertCtrl) {
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.cargar = false;
        this.mensaje = 'Cargando...';
        this.ciudadList = [];
        this.tem_date_begin = new Date().toISOString();
        var self = this;
        self.item = self.navParams.get('item');
        console.log(self.item);
        if (self.item != null) {
            self.item.nuevo = false;
            self.item.editable = false;
            self.ciudad = self.item.city_id[0];
        }
        else {
            self.item = {
                name: '',
                city_id: ['', ''],
                total_usd: 0,
                total_eur: 0,
                total_rub: 0,
                total_pp: 0,
                total_tarjeta: 0,
                state: '',
                conceptos: [],
                nuevo: true
            };
            self.item.editable = true;
        }
        self.storage.get('companies').then(function (ciudad) {
            console.log(self.item);
            self.ciudadList = ciudad;
            if (self.item.city_id[0] == '') {
                self.ciudad = ciudad[0].name[0];
            }
        });
    }
    GastosFilterPage.prototype.closeModal = function (x) {
        if (x == 'x') {
            this.viewCtrl.dismiss(null);
        }
        else {
            this.viewCtrl.dismiss(x);
        }
    };
    GastosFilterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GastosFilterPage');
    };
    GastosFilterPage.prototype.calcular = function () {
        var usd = 0;
        var eur = 0;
        var rub = 0;
        var pp = 0;
        var tar = 0;
        for (var key in this.item.conceptos) {
            if (this.item.conceptos[key].moneda == 'usd') {
                usd = usd + this.item.conceptos[key].sub_total;
            }
            else if (this.item.conceptos[key].moneda == 'eur') {
                eur = eur + this.item.conceptos[key].sub_total;
            }
            else if (this.item.conceptos[key].moneda == 'rub') {
                rub = rub + this.item.conceptos[key].sub_total;
            }
            else if (this.item.conceptos[key].moneda == 'pp') {
                pp = pp + this.item.conceptos[key].sub_total;
            }
            else if (this.item.conceptos[key].moneda == 'card') {
                tar = tar + this.item.conceptos[key].sub_total;
            }
        }
        this.item.total_usd = usd;
        this.item.total_eur = eur;
        this.item.total_rub = rub;
        this.item.total_pp = pp;
        this.item.total_tarjeta = tar;
    };
    GastosFilterPage.prototype.addConcepto = function () {
        this.item.conceptos.push({
            concepto: '',
            moneda: 'eur',
            price_unit: 0,
            unidades: 0,
            sub_total: 0,
            id: null
        });
    };
    GastosFilterPage.prototype.calcular_sub = function (con) {
        console.log(con.unidades * con.price_unit);
        con.sub_total = con.unidades * con.price_unit;
        console.log(con.sub_total);
        this.calcular();
    };
    GastosFilterPage.prototype.editar = function () {
        if (!this.item.editable) {
            this.item.editable = true;
        }
        else {
            this.item.editable = false;
        }
    };
    GastosFilterPage.prototype.formatDate = function (date) {
        var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    };
    GastosFilterPage.prototype.onChange = function () {
        console.log('entro');
        this.calcular();
    };
    GastosFilterPage.prototype.guardar = function () {
        var self = this;
        self.cargar = true;
        self.mensaje = 'Guardando...';
        this.storage.get('conexion').then(function (conexion) {
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(function (uid) {
                if (self.item.nuevo) {
                    odoo.create('tours.gastos.diversos', {
                        name: self.formatDate(self.tem_date_begin), city_id: self.ciudad,
                        total_usd: self.item.total_usd, total_eur: self.item.total_eur,
                        total_rub: self.item.total_rub, total_pp: self.item.total_pp, total_tarjeta: self.item.total_tarjeta,
                        state: 'borrador'
                    }).then(function (id_nuevo) {
                        for (var key = 0; self.item.conceptos.length > key; key++) {
                            //for (var key in self.item.conceptos) {
                            self.item.conceptos[key].gastos_id = id_nuevo;
                            console.log(self.item.conceptos[key]);
                            (function (key) {
                                odoo.create('tours.gastos.conceptos', self.item.conceptos[key]).then(function (id_conceptos) {
                                    console.log(self.item.conceptos.length + '   ' + key);
                                    if (self.item.conceptos.length == key + 1) {
                                        self.closeModal('n');
                                    }
                                }, function () {
                                });
                            })(key);
                        }
                    }, function () {
                        self.presentAlert('Falla', 'Imposible Conectar.');
                    });
                }
                else {
                    odoo.write('tours.gastos.diversos', self.item.id, {
                        name: self.formatDate(self.tem_date_begin), city_id: self.ciudad,
                        total_usd: self.item.total_usd, total_eur: self.item.total_eur,
                        total_rub: self.item.total_rub, total_pp: self.item.total_pp, total_tarjeta: self.item.total_tarjeta,
                        state: 'borrador'
                    }).then(function (id_nuevo) {
                        console.log(self.item.conceptos);
                        for (var key = 0; self.item.conceptos.length > key; key++) {
                            console.log(self.item.conceptos[key]);
                            //                                    self.item.conceptos[key].gastos_id = id_nuevo;
                            console.log(self.item.conceptos[key]);
                            (function (key) {
                                if (self.item.conceptos[key].id != null) {
                                    self.item.conceptos[key].gastos_id = self.item.id;
                                    odoo.write('tours.gastos.conceptos', self.item.conceptos[key].id, self.item.conceptos[key]).then(function (id_conceptos) {
                                        console.log(self.item.conceptos.length + '   ' + key);
                                        if (self.item.conceptos.length == key + 1) {
                                            self.closeModal('n');
                                        }
                                    }, function () {
                                    });
                                }
                                else {
                                    self.item.conceptos[key].gastos_id = self.item.id;
                                    odoo.create('tours.gastos.conceptos', self.item.conceptos[key]).then(function (id_conceptos) {
                                        console.log(id_conceptos);
                                        console.log(self.item.conceptos.length + '   ' + key);
                                        if (self.item.conceptos.length == key + 1) {
                                            self.closeModal('n');
                                        }
                                    }, function () {
                                    });
                                }
                            })(key);
                        }
                    }, function () {
                        self.presentAlert('Falla', 'Imposible Conectar.');
                    });
                }
            }, function () {
                self.presentAlert('Falla', 'Imposible Conectar.');
            });
        });
    };
    GastosFilterPage.prototype.presentAlert = function (titulo, texto) {
        var alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    };
    GastosFilterPage = __decorate([
        Component({
            selector: 'page-gastos-filter',
            templateUrl: 'gastos-filter.html',
        }),
        __metadata("design:paramtypes", [ViewController, NavController, Storage, NavParams, AlertController])
    ], GastosFilterPage);
    return GastosFilterPage;
}());
export { GastosFilterPage };
//# sourceMappingURL=gastos-filter.js.map