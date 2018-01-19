import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';
import {SalarioDetailPage} from '../../pages/salario-detail/salario-detail';

declare var OdooApi: any;

@Component({
    selector: 'page-salario',
    templateUrl: 'salario.html',
})
export class SalarioPage {

    items;
    cargar;
    mensaje = '';
    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {

    }

    ionViewDidLoad() {

        this.cargar = true
        var self = this;
        var odoo = new OdooApi(global.url, global.db);
        this.items = null;
        odoo.login(global.username, global.password).then(
            function (uid) {
                odoo.search_read('tours.gastos.generales', [['id', '!=', '0']],
                    ['name', 'sala_guia', 'city_id', 'total_metro']).then(
                    function (value2) {
//                        console.log(value2);
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

    ejecute(item) {
        item.nuevo = true;
        item.editable = false;
        this.navCtrl.push(SalarioDetailPage, {item: item});
    }

    nuevo() {
        this.navCtrl.push(SalarioDetailPage, 
        {item: {name: '', city_id: ['', ''], sala_guia: '', total_metro: '',
        nuevo:false, editable:true}})
    }

    refresh() {
        this.ionViewDidLoad();
    }
}

