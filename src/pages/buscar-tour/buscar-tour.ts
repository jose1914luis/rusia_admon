import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'page-buscar-tour',
    templateUrl: 'buscar-tour.html',
})
export class BuscarTourPage {

    tours = [];
    tours2 = [];
    buscar = '';
    shouldShowCancel = true;
    item
    editable = false
    nueva = false
    cargar = false
    constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {

        this.item = this.navParams.get('item');
        if (this.item == null) {
            this.item = {
                asistencia: false,
                name: ['', ''],
                email: ['', ''],
                telefono: '',
                personas_pago: 0,
                personas_terceros: 0,
                personas_all_in: 0,
                total_personas: 0,
                abono_euros: 0,
                abono_dolar: 0,
                abonor_rublo: 0,
                pay_pal: 0,
                tarjeta: 0,
                euros_exportado: 0,
                dolar_exportado: 0,
                rublo_exportado: 0,
                observaciones: '',
                padrino: '',
            }
            this.nueva = true;
            this.editable = true;
        } else {
            //            this.buscarCliente = this.item.name[1]
            //            this.buscarEmail = this.item.email[1]
            //            this.buscarPadrino = this.item.padrino[1]
            //            this.id_cliente = this.item.name[0]
            //            this.id_email = this.item.email[0]
            //            this.id_padrino = this.item.padrino[0]
        }
        //        var self = this;
        //        this.storage.get('tours').then((tours) => {
        //            self.tours = tours;
        //            self.tours2 = tours;
        //        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BuscarTourPage');
    }
    onInput(e) {
        console.log(e);
        this.tours = [];
        for (var key in this.tours2) {
            if (String(this.tours2[key].name).toLowerCase().includes(this.buscar)) {
                console.log(this.tours2[key].name);
                this.tours.push(this.tours2[key]);
            }
        }
        //this.buscar.
    }

    onCancel(e) {
        console.log(e);
    }

    closeModal(x) {
        if (x == 'x') {
            this.viewCtrl.dismiss(null);
        } else {
            this.viewCtrl.dismiss(x);
        }
    }


}
