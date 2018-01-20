import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';
import {NomDetailPage} from '../../pages/nom-detail/nom-detail';

declare var OdooApi: any;

@Component({
    selector: 'page-nom',
    templateUrl: 'nom.html',
})
export class NomPage {

    items;
    cargar = true;
    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {

        
    }

    ionViewDidLoad() {
        var self = this;
        self.cargar = true;
        self.items = null;
        var odoo = new OdooApi(global.url, global.db);
        odoo.login(global.username, global.password).then(
            function (uid) {
                odoo.search_read('tours.nomina', [['id', '!=', '0']],
                    ['name', 'semana', 'city_id', 'pax_pago', 'total_rub',
                        'total_eur', 'total_usd', 'total_res', 'total_metro', 'state']).then(
                    function (value2) {
                        console.log(value2);
                        self.items = value2;
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
        let alert = this.alertCtrl.create({
            title: 'Buscar',
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
                    type: 'radio',
                    label: 'todos',
                    value: 'todos'
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
//                        
//                        if (data.semIni.length > 0 || data.semFin.length > 0 || data.fechaIni.length > 0 || data.fechaFin.length > 0) {
//                            for (let key in self.items) {
//
//                                self.items[key].visible = false;
//                                
//                                if (self.items[key].semana >= data.semIni && self.items[key].semana <= data.semFin) {
////                                    console.log(self.items[key]);
//                                    self.items[key].visible = true;
//                                }
//                            }
//                        } else {
//                            for (let key in self.items) {
//
//                                self.items[key].visible = true;
//                            }
//                        }

                    }
                }
            ]
        });
        alert.present();
    }
}

