import {Component} from '@angular/core';
import {NavController, ModalController, NavParams, AlertController, ViewController} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';
import {Storage} from '@ionic/storage';
import {BuscarTourPage} from '../../pages/buscar-tour/buscar-tour';

declare var OdooApi: any;
@Component({
    selector: 'page-pago-detail',
    templateUrl: 'pago-detail.html',
})
export class PagoDetailPage {

    item;
    editable = false;
    cargar = false;
    tem_date_begin
    visible_list_tour = false
    buscarTour = ''
    tours = []
    tours2 = []
    id_tour = 0
    constructor(public modalCtrl: ModalController, public viewCtrl: ViewController, public navCtrl: NavController, private storage: Storage, public navParams: NavParams, public alertCtrl: AlertController) {
        this.item = this.navParams.get('item');
        console.log(this.item)
        this.item.tours_id.name = this.item.tours_id[1];
        this.item.tours_id.id = this.item.tours_id[0];

        var dateStart = new Date(this.item.name);
        this.tem_date_begin = dateStart.toISOString();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PagoDetailPage');
    }

    editar() {

        if (!this.editable) {
            this.editable = true;
        } else {
            this.editable = false;
        }
    }

     onKeyTour(e) {
        //        console.log(e);
        if (this.buscarTour.length > 0) {
            this.visible_list_tour = true;
            this.tours = [];
            for (var key in this.tours2) {
                if (String(this.tours2[key].name).toLowerCase().includes(this.buscarTour)) {
                    console.log(this.tours2[key].name);
                    this.tours.push(this.tours2[key]);
                }
            }
        } else {
            this.visible_list_tour = false;
        }

        //this.buscar.
    }

    onCancelTour(e) {
        self.
            console.log(e);
        this.visible_list_tour = false;
    }

    selectTour(valor) {
        this.visible_list_tour = false;
        this.buscarTour = valor.name;
        this.id_tour = valor.id;
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

        var self = this;
        this.cargar = true;
        this.storage.get('conexion').then((conexion) => {
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(
                function (uid) {

                    //                    console.log({
                    //                        name: self.formatDate(self.tem_date_begin),
                    //                        semana: self.item.semana,
                    //                        total_eur: self.item.total_eur,
                    //                        total_usd: self.item.total_usd,
                    //                        total_res: self.item.total_res,
                    //                        total_rub: self.item.total_rub,
                    //                        total_metro: self.item.total_metro,
                    //                        pax_pago: self.item.pax_pago,
                    //                        tours_id: self.item.tours_id.id
                    //                    });

                    odoo.write('tours.pago.guia', self.item.id, {
                        name: self.formatDate(self.tem_date_begin),
                        semana: self.item.semana,
                        total_eur: self.item.total_eur,
                        total_usd: self.item.total_usd,
                        total_res: self.item.total_res,
                        total_rub: self.item.total_rub,
                        total_metro: self.item.total_metro,
                        pax_pago: self.item.pax_pago,
                        tours_id: self.id_tour
                    }).then(
                        function (value2) {
                            console.log(value2);
                            if (!value2) {
                                self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                            }
                            self.cargar = false;
                            self.closeModal('n');
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
    
    closeModal(x) {
        if (x == 'x') {
            this.viewCtrl.dismiss(null);
        } else {
            this.viewCtrl.dismiss(x);
        }
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
