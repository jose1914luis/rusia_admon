import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, ModalController} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';
import {Storage} from '@ionic/storage';
import {GastosNuevoPage} from '../../pages/gastos-nuevo/gastos-nuevo';

declare var OdooApi: any;
@Component({
    selector: 'page-gastos-filter',
    templateUrl: 'gastos-filter.html',
})
export class GastosFilterPage {

    item;
    cargar = false;
    mensaje = 'Cargando...';
    ciudad;
    ciudadList = [];
    tem_date_begin = new Date().toISOString();
    constructor(public modalCtrl: ModalController, public navCtrl: NavController, private storage: Storage, public navParams: NavParams, public alertCtrl: AlertController) {

        var self = this;

        if (this.navParams.get('item') != null) {
            this.item = this.navParams.get('item');

            this.item.nuevo = true;
            this.item.editable = false;
        } else {
            this.item = {
                name: '',
                city_id: ['', ''],
                total_usd: 0,
                total_eur: 0,
                total_rub: 0,
                total_pp: 0,
                total_tarjeta: 0,
                state: '',
                conceptos: []
            }
            this.item.editable = true;

            this.storage.get('companies').then((ciudad) => {

                console.log(ciudad);
                self.ciudadList = ciudad;
                self.ciudad = ciudad[0].name[0];
            });
        }

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad GastosFilterPage');
    }
    calcular() {
        var usd = 0;
        var eur = 0;
        var rub = 0;
        var pp = 0;
        var tar = 0;
        for (var key in this.item.conceptos) {
            if (this.item.conceptos[key].moneda == 'usd') {
                usd = usd + this.item.conceptos[key].sub_total;
            } else if (this.item.conceptos[key].moneda == 'eur') {
                eur = eur + this.item.conceptos[key].sub_total;
            } else if (this.item.conceptos[key].moneda == 'rub') {
                rub = rub + this.item.conceptos[key].sub_total;
            } else if (this.item.conceptos[key].moneda == 'pp') {
                pp = pp + this.item.conceptos[key].sub_total;
            } else if (this.item.conceptos[key].moneda == 'card') {
                tar = tar + this.item.conceptos[key].sub_total;
            }


        }
        this.item.total_usd = usd;
        this.item.total_eur = eur;
        this.item.total_rub = rub;
        this.item.total_pp = pp;
        this.item.total_tarjeta = tar;
    }
    addConcepto() {
        var self = this;
        let profileModal = this.modalCtrl.create(GastosNuevoPage);
        profileModal.onDidDismiss(data => {
            if (data != null) {
                self.item.conceptos.push(data);
                self.calcular();
            }
        });
        profileModal.present();
    }
    editar() {

        if (!this.item.editable) {
            this.item.editable = true;
        } else {
            this.item.editable = false;
        }
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    guardar() {

//        this.cargar = true;
        var self = this;
        self.mensaje = 'Guardando...';
        this.storage.get('conexion').then((conexion) => {
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(
                function (uid) {

                    odoo.create('tours.gastos.diversos',{
                        name: self.formatDate(self.tem_date_begin), city_id: self.ciudad,
                        total_usd: self.item.total_usd, total_eur: self.item.total_eur,
                        total_rub: self.item.total_rub, total_pp: self.item.total_pp, total_tarjeta: self.item.total_tarjeta,
                        state: 'borrador'
                    }).then(
                        function (id_nuevo) {
                            console.log(id_nuevo)
//                            if (id_nuevo > 0) {
//                                self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
//                                return;
//                            }

                            for(var key in self.item.conceptos) {
                                self.item.conceptos[key].gastos_id = id_nuevo;
                                console.log(self.item.conceptos[key]); 
                                (function (key) { 
                                    odoo.create('tours.gastos.conceptos', self.item.conceptos[key]).then(
                                        function (id_conceptos) {
                                            console.log(id_conceptos)                     
                                        }, function () {
                                        }
                                        )
                                })(key);
                            }
                        },
                        function () {
//                            self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                        }
                        );
                },
                function () {

                }
            );

        });

    }

    presentAlert(titulo, texto) {
        const alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    }


}
