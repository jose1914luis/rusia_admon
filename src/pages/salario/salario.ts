import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, ModalController} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';
import {SalarioDetailPage} from '../../pages/salario-detail/salario-detail';
import {Storage} from '@ionic/storage';

declare var OdooApi: any;

@Component({
    selector: 'page-salario',
    templateUrl: 'salario.html',
})
export class SalarioPage {

    items;
    cargar;
    mensaje = '';
    constructor(public navCtrl: NavController, public modalCtrl: ModalController, private storage: Storage, public navParams: NavParams, public alertCtrl: AlertController) {

    }

    ionViewDidLoad() {

        this.cargarConDatos();
    }

    cargarConDatos() {
        this.cargar = true
        var self = this;
        this.items = null;
        this.storage.get('conexion').then((conexion) => {
            var odoo = new OdooApi(global.url, conexion.bd);

            odoo.login(conexion.username, conexion.password).then(
                function (uid) {
                    odoo.search_read('tours.gastos.generales', [['id', '!=', '0']],
                        ['name', 'sala_guia', 'city_id', 'total_metro']).then(
                        function (generales) {
                            console.log(generales);
                            self.items = generales
                            self.storage.set('generales', generales);
                            self.cargar = false;
                        },
                        function () {
                            self.cargarSinDatos();
                        }
                        );

                },
                function () {
                    self.cargarSinDatos();
                }
            );
        });
    }

    cargarSinDatos() {

        this.cargar = true
        var self = this;
        this.items = null;
        this.storage.get('generales').then((generales) => {

            if (generales != null) {
                console.log(generales);
                self.items = generales
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
        item.nuevo = true;
        item.editable = false;
        //        this.navCtrl.push(SalarioDetailPage, {item: item});
        var self = this;
        let profileModal = this.modalCtrl.create(SalarioDetailPage, {item: item});
        profileModal.onDidDismiss(data => {
            if (data != null) {
                self.cargarConDatos();
            }
        });
        profileModal.present();

    }

    nuevo() {
        
        var self = this;
        let profileModal = this.modalCtrl.create(SalarioDetailPage, {item: null});
        profileModal.onDidDismiss(data => {
            if (data != null) {
                self.cargarConDatos();
            }
        });
        profileModal.present();

//        this.navCtrl.push(SalarioDetailPage, {item: null});
    }

    refresh() {
        this.ionViewDidLoad();
    }
}

