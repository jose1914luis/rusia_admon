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

    constructor(public modalCtrl: ModalController, public navCtrl: NavController, private storage: Storage, public navParams: NavParams, public alertCtrl: AlertController) {
        this.item = this.navParams.get('item');
        this.item.nuevo = true;
        this.item.editable = false;

        //------------//
        this.cargar = true;
        var self = this;
        this.storage.get('conexion').then((conexion) => {
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(
                function (uid) {
                    odoo.search_read('tours.gastos.conceptos', [['gastos_id', '=', self.item.id]],
                        ['concepto', 'moneda', 'price_unit', 'unidades', 'sub_total']).then(
                        function (value2) {

                            self.item.conceptos = value2;
                            console.log(self.item);
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

    ionViewDidLoad() {
        console.log('ionViewDidLoad GastosFilterPage');
    }
    addConcepto() {
        var self = this;
        let profileModal = this.modalCtrl.create(GastosNuevoPage);
        profileModal.onDidDismiss(data => {
            if (data != null) {

             
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

    guardar() {

        this.cargar = true;
        var self = this;
        this.storage.get('conexion').then((conexion) => {
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(
                function (uid) {


                    //                console.log(self.item);
                    odoo.write('tours.gastos.generales', self.item.id, {
                        sala_guia: self.item.sala_guia,
                        total_metro: self.item.total_metro,
                        name: self.item.name,
                        city_id: self.item.city_id[0]
                    }).then(
                        function (value2) {
                            if (!value2) {
                                self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                            }
                            self.cargar = false;
                            //console.log(value2);
                        },
                        function () {
                            self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
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
