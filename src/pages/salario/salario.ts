import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, ModalController} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';
import {SalarioDetailPage} from '../../pages/salario-detail/salario-detail';
import {Storage} from '@ionic/storage';
import {UtilProvider} from '../../providers/util/util';

declare var OdooApi: any;

@Component({
    selector: 'page-salario',
    templateUrl: 'salario.html',
})
export class SalarioPage {

    items;
    cargar;
    mensaje = '';
    constructor(private util:UtilProvider, public navCtrl: NavController, public modalCtrl: ModalController, private storage: Storage, public navParams: NavParams, public alertCtrl: AlertController) {

    }

    ionViewDidLoad() {

        this.cargarSinDatos();
    }

    private async cargarConDatos() {
        this.cargar = true
        var self = this;
        this.items = null;
        var conexion = await self.util.getValues('conexion');

        var odoo = new OdooApi(global.url, conexion.bd);

        odoo.login(conexion.username, conexion.password).then(
            async function (uid) {

                var consulta;
                //console.log(JSON.stringify(conexion));
                if (conexion.tipo_a == 'xciudad') {
                    
                    var companies = await self.util.getValues('companies');
                    var ids_city = [];
                    for (var i in companies) {
                      
                      console.log(JSON.stringify(companies[i].name[0]));
                      ids_city.push(companies[i].name[0]);
                    }

                    consulta = [['city_id', 'in', ids_city]]

                } else {
                    
                    consulta = [['id', '!=', '0']]

                }

                odoo.search_read('tours.gastos.generales', consulta,
                    ['name', 'sala_guia', 'city_id', 'total_metro']).then(
                    function (generales) {
                        console.log(generales);
                        self.items = generales
                        self.storage.set('generales', generales);
                        self.cargar = false;
                    },
                    function () {
                        self.presentAlert('Falla', 'Imposible Cargar Datos.');
                        self.cargar = false;
                    }
                    );

            },
            function () {
                self.presentAlert('Falla', 'Imposible Cargar Datos.');
                self.cargar = false;
                
            }
        );       
    }

    private async cargarSinDatos() {

        this.cargar = true
        var self = this;
        this.items = null;
        var generales = await self.util.getValues('generales');

        if (generales != null) {
            //console.log(generales);
            self.items = generales
            self.cargar = false;
        } else {
            self.cargarConDatos();
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
        this.cargarConDatos();
    }
}

