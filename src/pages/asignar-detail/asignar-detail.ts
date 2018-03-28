import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, ModalController, ViewController} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';
import {Storage} from '@ionic/storage';

import {BuscarTourPage} from '../../pages/buscar-tour/buscar-tour';
//import {BuscarGuiaPage} from '../../pages/buscar-guia/buscar-guia';

declare var OdooApi: any;
@Component({
    selector: 'page-asignar-detail',
    templateUrl: 'asignar-detail.html',
})
export class AsignarDetailPage {

    item;
    editable = false;
    no_editable = true;
    cargar = false;
    nuevo = false;
    startTime = new Date().toISOString();
    endTime = new Date().toISOString();

    tours = [];
    tours2 = [];
    buscarTour = '';
    visible_list_tour = false
    id_tour = 0

    guias = [];
    guias2 = [];
    buscarGuia = '';
    visible_list_guia = false
    id_guia = 0

    constructor(public viewCtrl: ViewController, public modalCtrl: ModalController, public navCtrl: NavController, private storage: Storage, public navParams: NavParams, public alertCtrl: AlertController) {

        this.item = this.navParams.get('item');
        console.log(this.item);
        if (this.item != false) {
//            this.item = this.navParams.data;             
            
            this.buscarTour = this.item.tour_id[1]
            this.id_tour = this.item.tour_id[0]
            if (this.item.guia_id != ""){
                this.buscarGuia = this.item.guia_id[1];
                this.id_guia = this.item.guia_id[0];    
            }
            var dateS = new Date(this.item.startTime);
            this.startTime = new Date(dateS.getTime() - (dateS.getTimezoneOffset() * 60000)).toISOString();
            
            var dateE = new Date(this.item.endTime);
            this.endTime = new Date(dateE.getTime() - (dateE.getTimezoneOffset() * 60000)).toISOString()
            
        } else {
            this.editable = true;
            this.nuevo = true;
            this.item = {
                id: '',
                tour_id: ['',''],
                guia_id: ['',''],
                date_end: '',
                date_begin: '',
                startTime: new Date().toISOString(),
                endTime: new Date().toISOString(),
                personas_pago: '',
                personas_terceros: '',
                personas_all_in: '',
                total_personas: '',
                total_euro_res: '',
                total_dolar_res: '',
                total_rublo_res: '',
                pay_pal: '',
                tarjeta: '',
                observaciones: '',
                allDay:false,
                entregado:false,
                futuras:[],
                is_free:false,
                is_private:false,
                no_editable:true,
                reservas:[],
                title : ''
            }

        }

        var self = this;
        this.storage.get('tours').then((tours) => {
            self.tours = tours;
            //console.log(tours)
            self.tours2 = tours;
        });

        this.storage.get('guias').then((guias) => {
            //console.log(guias);
            self.guias = guias;
            self.guias2 = guias;
        });

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AsignarDetailPage');
    }

    closeModal(x) {
        if (x == 'x') {
            this.viewCtrl.dismiss(null);
        } else {
            this.viewCtrl.dismiss(this.item);
        }
    }

    onCancelTour(e) {
        console.log(e);
        this.visible_list_tour = false;
    }

    selectTour(valor) {
        this.visible_list_tour = false;
        this.buscarTour = valor.name;
        this.id_tour = valor.id;
        this.item.tour_id = [valor.id, valor.name]
        this.item.title = valor.name
    }

    addCero(num){

        if (num < 10 && num.toString().length < 2 ) {
         return (num = '0' + num);
        }

        return num
    }

    convertirFecha(fecha){
        var dateS = new Date(fecha)

        var date = new Date(dateS.getTime() + (dateS.getTimezoneOffset() * 60000));

        var year = date.getFullYear();
        var month = this.addCero(date.getMonth()+1);
        var dia = this.addCero(date.getDate())
        var hora = this.addCero(date.getHours())
        var minutos = this.addCero(date.getMinutes())
        var segundos = this.addCero(date.getSeconds())     

        return year+'-' + month + '-'+ dia + ' ' + hora + ':' + minutos + ':' + segundos;
    }

    onKeyTour(e) {
                console.log(e);
        if (this.buscarTour.length > 0) {
            console.log('entro en el key ');
            this.visible_list_tour = true;
            this.tours = [];
            for (var key in this.tours2) {
                //console.log(this.tours2[key].name);
                //console.log('INSTR ' + this.buscarTour.toLowerCase())
                //console.log('condicion' + String(this.tours2[key].name).toLowerCase().includes(this.buscarTour.toLowerCase()))
                if (String(this.tours2[key].name).toLowerCase().includes(this.buscarTour.toLowerCase())) {
                    //console.log('entro en el if');
                    //console.log(this.tours2[key].name);
                    this.tours.push(this.tours2[key]);
                }
            }
        } else {
            this.visible_list_tour = false;
        }

        //this.buscar.
    }

    onCancelGuia(e) {
        console.log(e);
        this.visible_list_guia = false;
    }

    selectGuia(valor) {
        this.visible_list_guia = false;
        this.buscarGuia = valor.name;
        this.id_guia = valor.id;
        this.item.guia_id = [valor.id, valor.name]
    }

    onKeyGuia(e) {
                console.log(e);
        if (this.buscarGuia.length > 0) {
            console.log('entro en el key ');
            this.visible_list_guia = true;
            this.guias = [];
            for (var key in this.guias2) {
                //console.log(this.guias2[key].name);
                //console.log('INSTR ' + this.buscarGuia.toLowerCase())
                //console.log('condicion' + String(this.guias2[key].name).toLowerCase().includes(this.buscarGuia.toLowerCase()))
                if (String(this.guias2[key].name).toLowerCase().includes(this.buscarGuia.toLowerCase())) {
                    //console.log('entro en el if');
                    //console.log(this.guias2[key].name);
                    this.guias.push(this.guias2[key]);
                }
            }
        } else {
            this.visible_list_guia = false;
        }

        //this.buscar.
    }

    /*buscarTour() {
        if (this.editable && this.no_editable) {
            var self = this;
            let profileModal = this.modalCtrl.create(BuscarTourPage);
            profileModal.onDidDismiss(data => {
                if (data != null) {
                    self.item.tour_id = data;
                    console.log(self.item.tour_id.name);
                }
            });
            profileModal.present();
        }
    }*/

    editar() {

        if (!this.editable) {
            this.editable = true;
        } else {
            this.editable = false;
        }
    }

    guardar() {


        this.cargar = true;
        var self = this;

        this.item.date_begin =  this.convertirFecha(this.startTime)
        this.item.date_end =  this.convertirFecha(this.endTime)
        //this.convertirFecha(this.item.startTime);
        var dato = {
            guia_id:self.id_guia, tour_id:self.id_tour, 
            date_begin: self.item.date_begin, date_end: self.item.date_end, personas_pago: self.item.personas_pago,
            personas_terceros: self.item.personas_terceros, personas_all_in: self.item.personas_all_in,
            total_personas: self.item.total_personas, total_rublo: self.item.total_rublo, total_euro: self.item.total_euro,
            total_dolar: self.item.total_dolar, pay_pal: self.item.pay_pal, tarjeta: self.item.tarjeta,
            entregado: self.item.entregado, state: self.item.state, observaciones: self.item.observaciones
        }
        this.storage.get('conexion').then((conexion) => {
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(
                function (uid) {

                    if(self.nuevo){

                        odoo.create('tours.guia', dato).then(
                            function (value2) {
                                console.log(value2);
                                if (!value2) {
                                    self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                                }
                                self.cargar = false;
                                self.item.nuevo = true;
                                self.closeModal(self.item);
                            },
                            function () {
                                 self.apilar(dato, 'create',  null)
                            }
                        );
                        //self.item.nuevo = true;
                        //self.closeModal(self.item);

                    }else{

                        odoo.write('tours.guia', self.item.id, dato).then(
                            function (value2) {
                                console.log(value2);
                                if (!value2) {
                                    self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                                }
                                self.cargar = false;
                                self.item.nuevo = false;
                                self.closeModal(self.item);
                            },
                            function () {
                                self.apilar(dato, 'write',  self.item.id)
                            }
                        );
                        //self.item.nuevo = false;
                        //self.closeModal(self.item);    

                    }                    
                },
                function () {
                    if (self.nuevo) {
                        self.apilar(dato, 'create',  null)

                    }else{
                        self.apilar(dato, 'write',  self.item.id)
                    }
                }
            );
        });


    }

  
    apilar(dato, operacion, id) {

        var self = this
        var registro = {
            operacion: operacion,
            tabla: 'tours.guia',
            dato: dato,
            id: id
        }
        self.storage.get('offline').then((offline) => {

            if (offline != null) {
                offline.push(registro)
            } else {
                var pila = []
                pila.push(registro)
                self.storage.set('offline', pila)
            }
        })
    }

    presentAlert(titulo, texto) {
        const alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    }

    calcular() {
        this.item.total_personas = parseInt(this.item.personas_pago) + parseInt(this.item.personas_terceros) + parseInt(this.item.personas_all_in);
    }


}
