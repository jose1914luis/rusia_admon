import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, ModalController} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';
import {NomDetailPage} from '../../pages/nom-detail/nom-detail';
import {NomFilterPage} from '../../pages/nom-filter/nom-filter';
import {Storage} from '@ionic/storage';

declare var OdooApi: any;

@Component({
    selector: 'page-nom',
    templateUrl: 'nom.html',
})
export class NomPage {

    items;
    cargar = true;
    constructor(public modalCtrl: ModalController, private storage: Storage, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {


    }

    ionViewDidLoad() {

        this.cargarConDatos();

    }   

    cargarConDatos() {
        var self = this;
        this.storage.get('conexion').then((conexion) => {
            self.cargar = true;
            self.items = null;
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(
                function (uid) {
                    odoo.search_read('tours.nomina', [['id', '!=', '0']],
                        ['name', 'semana', 'city_id', 'pax_pago', 'total_rub',
                            'total_eur', 'total_usd', 'total_res', 'total_metro', 'state']).then(
                        function (nomina) {

                            var ids = [];
                            for (let key in nomina) {

                                nomina[key].visible = true;
                                ids.push(nomina[key].semana)
                            }

                            odoo.search_read('tours.pago.guia', [['semana', 'in', ids]],
                                ['name', 'semana', 'tours_id', 'guia_user_id', 'city_id',
                                    'pax_pago', 'total_rub', 'total_eur', 'total_usd', 'total_res', 'total_metro', 'concepto']).then(
                                function (pago) {

                                    console.log(pago)
                                    for (let key_no in nomina) {
                                        for (let key_p in pago) {
                                            if (nomina[key_no].semana == pago[key_p].semana) {
                                                nomina[key_no].pago_id =  pago[key_p].id;
                                                nomina[key_no].name = pago[key_p].name;
                                                nomina[key_no].semana = pago[key_p].semana;
                                                nomina[key_no].tours_id = pago[key_p].tours_id;
                                                nomina[key_no].guia_user_id = pago[key_p].guia_user_id[1];
                                                nomina[key_no].city_id = pago[key_p].city_id;
                                                nomina[key_no].pax_pago = pago[key_p].pax_pago;
                                                nomina[key_no].total_rub = pago[key_p].total_rub;
                                                nomina[key_no].total_eur = pago[key_p].total_eur;
                                                nomina[key_no].total_usd = pago[key_p].total_usd;
                                                nomina[key_no].total_res = pago[key_p].total_res;
                                                nomina[key_no].total_metro = pago[key_p].total_metro;
                                                nomina[key_no].concepto = pago[key_p].concepto;
//                                                
                                            }
                                        }
                                    }
                                    console.log(nomina);
                                    self.items = nomina;

                                    self.storage.set('nomina', self.items);
                                    self.cargar = false;
                                },
                                function () {
                                    self.cargarSinDatos()
                                }
                                );
                        },
                        function () {
                            self.cargarSinDatos()

                        }
                        );

                },
                function () {
                    self.cargarSinDatos()
                }
            );
        });
    }

    cargarSinDatos() {

        var self = this;
        this.storage.get('nomina').then((nomina) => {

            if (nomina != null) {
                self.items = nomina;
                self.cargar = false;
            } else {
                self.presentAlert('Falla', 'Imposible Cargar Datos.');
            }
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

    ejecute(item) {
        //        console.log(NomDetailPage);
        this.navCtrl.push(NomDetailPage, {item: item});
    }

    refresh() {
        this.ionViewDidLoad();
    }

    buscar() {
        var self = this;
        let profileModal = this.modalCtrl.create(NomFilterPage);
        profileModal.onDidDismiss(data => {
            if (data != null) {

                if (data.semanaIni > 0 || data.semanaFin > 0) {
                    for (let key in self.items) {

                        self.items[key].visible = false;

                        if (self.items[key].semana >= data.semanaIni && self.items[key].semana <= data.semanaFin) {

                            if (data.estado = 'todos') {
                                self.items[key].visible = true;
                            } else if (data.estado = 'pagados' && self.items[key].state == 'pagado') {
                                self.items[key].visible = true;
                            } else if (data.estado = 'pedientes' && self.items[key].state == 'pedientes') {
                                self.items[key].visible = true;
                            }

                        }
                    }
                } else {
                    for (let key in self.items) {

                        self.items[key].visible = true;
                    }
                }
            }
        });
        profileModal.present();
    }
}

