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
        var self = this;
        this.storage.get('conexion').then((conexion) => {
            self.cargar = true;
            self.items = null;
            var odoo = new OdooApi(global.url, conexion.db);
            odoo.login(conexion.username, conexion.password).then(
                function (uid) {
                    odoo.search_read('tours.nomina', [['id', '!=', '0']],
                        ['name', 'semana', 'city_id', 'pax_pago', 'total_rub',
                            'total_eur', 'total_usd', 'total_res', 'total_metro', 'state']).then(
                        function (value2) {
                            console.log(value2);
                            self.items = value2;
                            for (let key in self.items) {

                                self.items[key].visible = true;
                            }
                            self.cargar = false;
                        },
                        function () {
                            self.presentAlert('Falla', 'Imposible Conectar');
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

