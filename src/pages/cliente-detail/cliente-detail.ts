import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';


declare var OdooApi: any;
@Component({
    selector: 'page-cliente-detail',
    templateUrl: 'cliente-detail.html',
})
export class ClienteDetailPage {

    editable = false;
    item;
    cargar = true;
    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
        this.item = this.navParams.get('item');
//        console.log(this.item);
        var self = this;
        var odoo = new OdooApi(global.url, global.db);
        odoo.login(global.username, global.password).then(
            function (uid) {
                odoo.search_read('tours.clientes.middle', [['name', '=', self.item.id]],
                    ['tour_id', 'guia_id', 'name', 'telefono', 'email',
                        'nombre_hotel', 'personas_terceros', 'personas_all_in', 'total_personas', 'personas_pago', 
                        'abonor_rublo','abono_euros','abono_dolar', 'dolar_exportado', 'euros_exportado', 'rublo_exportado', 'pay_pal', 'tarjeta', 'asistencia', 'observaciones', 'fecha']).then(
                    function (value2) {
                         
                        self.item.tour_id = value2[0].tour_id[1];
                        
                        self.item.personas_terceros = value2[0].personas_terceros;
                        self.item.personas_all_in = value2[0].personas_all_in;
                        self.item.total_personas = value2[0].total_personas;
                        self.item.personas_pago = value2[0].personas_pago;
                        self.item.abonor_rublo = value2[0].abonor_rublo;
                        self.item.abono_euros = value2[0].abono_euros;
                        self.item.abono_dolar = value2[0].abono_dolar;
                        self.item.dolar_exportado = value2[0].dolar_exportado;
                        self.item.euros_exportado = value2[0].euros_exportado;
                        self.item.rublo_exportado = value2[0].rublo_exportado;
                        self.item.pay_pal = value2[0].pay_pal;
                        if(value2[0].pay_pal > 0){
                            self.item.es_pay_pal = true;
                        }else{
                            self.item.es_pay_pal = false;
                        }
                        self.item.tarjeta = value2[0].tarjeta;
                        if(value2[0].tarjeta > 0){
                            self.item.es_tarjeta = true;
                        }else{
                            self.item.es_tarjeta = false;
                        }
                        self.item.asistencia = value2[0].asistencia;
                        self.item.observaciones = value2[0].observaciones;
                        self.item.fecha = value2[0].fecha;                                                
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
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ClienteDetailPage');
    }

    presentAlert(titulo, texto) {
        const alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    }

    editar() {

        if (!this.editable) {
            this.editable = true;
        } else {
            this.editable = false;
        }
    }

}
