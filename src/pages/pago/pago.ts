import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, ModalController} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';
import {PagoDetailPage} from '../../pages/pago-detail/pago-detail';
import {Storage} from '@ionic/storage';

declare var OdooApi: any;

@Component({
    selector: 'page-pago',
    templateUrl: 'pago.html',
})
export class PagoPage {

    items;
    cargar = true;
    constructor(public modalCtrl: ModalController, public navCtrl: NavController, private storage: Storage, public navParams: NavParams, public alertCtrl: AlertController) {

    }

    ionViewDidLoad() {

        this.cargarConDatos()
    }

    cargarConDatos() {
        var self = this;
        this.storage.get('conexion').then((conexion) => {
            self.cargar = true;
            self.items = null;
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(
                function (uid) {
                    odoo.search_read('tours.pago.guia', [['id', '!=', '0']],
                        ['name', 'semana', 'tours_id', 'guia_user_id', 'city_id',
                            'total_eur', 'total_usd', 'total_res', 'total_rub', 'total_metro', 'pax_pago', 'state', 'concepto'], null, null, 'id desc').then(
                        function (pago) {
                            console.log(pago);
                            self.items = pago

                            for (let key in self.items) {

                                self.items[key].visible = true;
                            }
                            self.storage.set('pago', self.items)
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

        var self = this;
        self.cargar = true;
        self.items = null;
        this.storage.get('pago').then((pago) => {

            if (pago != null) {

                console.log(pago);
                self.items = pago

                for (let key in self.items) {

                    self.items[key].visible = true;
                }
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

//        this.navCtrl.push(PagoDetailPage, {item: item});
        
          var self = this;
        let profileModal = this.modalCtrl.create(PagoDetailPage, {item: item});
        profileModal.onDidDismiss(data => {
            if (data != null) {
                self.cargarConDatos();
            }
        });
        profileModal.present();
    }

    refresh() {
        this.ionViewDidLoad();
    }
    
    

    buscar() {

        var self = this;
        let alert = this.alertCtrl.create({
            title: 'Buscar Pago Diario',
            inputs: [
                {
                    name: 'semIni',
                    placeholder: 'Semana Inicial'
                },
                {
                    name: 'semFin',
                    placeholder: 'Semana Final'
                },
                {
                    name: 'fechaIni',
                    placeholder: 'Fecha Inicial (YYYY-MM-DD)'
                },
                {
                    name: 'fechaFin',
                    placeholder: 'Fecha Final (YYYY-MM-DD)'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Buscar',
                    handler: data => {

                        if (data.semIni.length > 0 || data.semFin.length > 0 || data.fechaIni.length > 0 || data.fechaFin.length > 0) {
                            for (let key in self.items) {

                                self.items[key].visible = false;
                                 
                                var fechaIni = new Date(data.fechaIni);
                                var fechaFin = new Date(data.fechaFin);
                                var fecha = new Date(self.items[key].name);
                                if (self.items[key].semana >= data.semIni && self.items[key].semana <= data.semFin) {
                                    
                                    self.items[key].visible = true;
                                }
                                if(fecha >= fechaIni && fecha <= fechaFin){
                                    self.items[key].visible = true;
                                }
                            }
                        } else {
                            for (let key in self.items) {

                                self.items[key].visible = true;
                            }
                        }

                    }
                }
            ]
        });
        alert.present();
    }
}

