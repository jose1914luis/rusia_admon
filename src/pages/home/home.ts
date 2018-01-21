import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';

declare var OdooApi: any;
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    items;
    cargar;
    mensaje = '';
    constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    }

    ionViewDidLoad() {
        this.cargar = true
        var self = this;
        this.items = null;
        var odoo = new OdooApi(global.url, global.db);

        odoo.login(global.username, global.password).then(
            function (uid) {
                odoo.search_read('tours.gastos.diversos', [['id', '!=', '0']],
                    ['name', 'city_id', 'total_usd', 'total_eur', 'total_rub', 'total_pp', 'total_tarjeta',
                    'state', 'conceptos_ids']).then(
                    function (value2) {
                        console.log(value2);
                        self.items = value2
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

    refresh() {
        this.ionViewDidLoad();
    }

}
