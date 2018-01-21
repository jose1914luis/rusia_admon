import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';

declare var OdooApi: any;

@Component({
    selector: 'page-sol',
    templateUrl: 'sol.html',
})
export class SolPage {

    items;
    cargar;
    mensaje = '';
    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    }

    ionViewDidLoad() {
        this.cargar = true
        var self = this;
        this.items = null;
        var odoo = new OdooApi(global.url, global.db);

        odoo.login(global.username, global.password).then(
            function (uid) {
                odoo.search_read('tours.clientes.solicitudes', [['id', '!=', '0']],
                    ['name', 'tour_id', 'num_person', 'date_begin', 'state', 'estado', 'comentarios', 'create_date']).then(
                    function (value2) {
                        console.log(value2);
                        
                        var ids = [];
                        for (var key in value2) {
                            ids.push(value2[key].name[0]);
                            value2[key].mostrar = false;
                            if(value2[key].state = 'borrador'){
                               value2[key].mostrar = true;
                            }
                        }
                        odoo.read('tours.clientes', ids,
                            ['email', 'telefono', 'hotel', 'nombre_hotel']).then(
                            function (value) {
                                
                                for (var key2 in value2) {
                                    for (var key in value) {
                                        if(value2[key2].name[0] == value[key].id){
                                            value2[key2].nombre_hotel = value[key].nombre_hotel;
                                            value2[key2].telefono = value[key].telefono;
                                            value2[key2].email = value[key].email;
                                        }
                                    }
                                }
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
