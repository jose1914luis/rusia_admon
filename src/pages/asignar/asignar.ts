import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {NavController, NavParams, AlertController, ModalController} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';
import {TabsPage} from '../../pages/tabs/tabs';
import {AsignarDetailPage} from '../../pages/asignar-detail/asignar-detail';
import {UtilProvider} from '../../providers/util/util';

declare var OdooApi: any;
@Component({
    selector: 'page-asignar',
    templateUrl: 'asignar.html',
})
export class AsignarPage {

    mensaje = '';
    cargar = true;
    viewTitle = '';
    calendar = {
        eventSource: [],
        mode: 'month',
        currentDate: new Date(),
        formatDayHeader: 'E',
        noEventsLabel: 'Sin Eventos',
        formatMonthTitle: 'MMMM yyyy',
        allDayLabel: 'Todo el día',
        formatWeekTitle: 'MMMM yyyy, Se $n'
    };
    item;
    tours;
    events = [];
    add = true;

    private odoo:any;
    constructor(private util:UtilProvider, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public modalCtrl: ModalController) {

    }

    ionViewDidLoad() {

        this.cargarSinDatos();

    }    

    

    private getGuia():any{

        var self = this;
        var promise = new Promise(function (resolve, reject) {
                        
            self.odoo.search_read('tours.guia', [['date_begin', '>=', '2017-12-01']], //, '', 'date_begin',
                            ['id', 'guia_id', 'tour_id', 'date_begin', 'date_end', 'personas_terceros', 'personas_all_in', 'total_personas', 'total_rublo', 'total_dolar', 'total_euro', 'total_rublo_res',
                            'total_euro_res', 'total_dolar_res', 'pay_pal', 'tarjeta', 'is_free', 'personas_pago', 'is_private', 'entregado', 'state', 'observaciones']).then(
            function (guia) {
                resolve(guia);
            },
            function (){
                reject(null);
            });

        });

        return promise;
        
    }

    private getMiddle(ids):any{

        var self = this;
        var promise = new Promise(function (resolve, reject) {
                        
            self.odoo.search_read('tours.clientes.middle', [['guia_id', 'in', ids]],
            ['tour_id', 'guia_id', 'name', 'telefono', 'email',
                'nombre_hotel', 'padrino', 'personas_terceros', 'personas_all_in', 'total_personas', 'personas_pago',
                'abonor_rublo', 'abono_euros', 'abono_dolar', 'dolar_exportado', 'euros_exportado', 'rublo_exportado', 'pay_pal', 'tarjeta', 'asistencia', 'observaciones', 'fecha']).then(

            function (middle) {
                resolve(middle);
            },
            function (){
                reject(null);
            });

        });

        return promise;
    }

    private getFuturas(ids):any{
        var self = this;
        var promise = new Promise(function (resolve, reject) {
                        
            self.odoo.search_read('tours.clientes.reservar.futuras', [['guia_id', 'in', ids]],
            ['tour_id', 'guia_id', 'name', 'telefono', 'email',
                'nombre_hotel', 'personas_terceros', 'personas_all_in', 'total_personas', 'personas_pago',
                'abonor_rublo', 'abono_euros', 'abono_dolar', 'is_sim', 'is_museo', 'hotel', 'pay_pal', 'tarjeta', 'observaciones', 'fecha']).then(

            function (futuras) {

                resolve(futuras);
            },
            function (){
                reject(null);
            });

        });

        return promise;
    }

    private getAdd(conexion, uid){

        var self = this;
        var promise = new Promise(function (resolve, reject) {

        self.odoo.search_read('tours.clientes', [['id', '!=', 0]],
            ['name', 'ilike', 'email', 'telefono', 'nombre_hotel',
                'active_email', 'is_padrino', 'pago_tarjeta', 'padre', 'observaciones']).then(
            function (clientes) {
                console.log(clientes)
                for (let key in clientes) {

                    clientes[key].visible = true;
                    clientes[key].middle = [];
                    //ids.push(clientes[key].id)
                }
                self.storage.set('clientes', clientes);//<--Todos los clientes Clientes  
                //self.storage.get('conexion').then((val_p) => {
                    //console.log('muestre val_p 2')
                    //console.log(val_p)
                //})
                self.odoo.search_read('tours.clientes.email', [['id', '!=', 0]],
                    ['name']).then(
                    function (email) {
                        //console.log(email)
                        self.storage.set('email', email);//<--Todos los emails
                        var consulta;
                        if (conexion.tipo_a == 'xciudad') {
                            consulta = [['administrador', '=', uid]]
                        } else {
                            consulta = [['id', '!=', '0']]
                        }
                        self.odoo.search_read('tours.companies', consulta, ['name', 'administrador']).then(
                            function (companies) {
                                //console.log(JSON.stringify(companies));
                                self.storage.remove('ciudad_tmp')
                                self.storage.set('companies', companies); //<--- Todas las Ciudades
                                var ban = true;
                                //console.log('ACA SE CONSULTA LAS GUIAS');
                                if(companies.length == 0){
                                    self.cargar = false;
                                }
                                for (var key = 0; companies.length > key; key++) {

                                    (function (key) {
                                        console.log(key);

                                        if (companies[key].administrador[0] == 7) {
                                        //if (companies[key].administrador[0] == uid) {
                                            //console.log('companies[key].administrador[0]:' + companies[key].administrador[0] + ' uid:' +uid)
                                            //console.log('uid')
                                            //companies[key].administrador[0] == uid
                                            self.odoo.search_read('res.users', [['city_id', '=', 1], ['active', '=', 1]],
                                            //self.odoo.search_read('res.users', [['city_id', '=', companies[key].name[0]], ['active', '=', 1]],
                                                ['name']).then(
                                                function (guias) {
                                                    console.log(guias)
                                                    self.storage.set('guias', guias);//<--Guias si los hay                      
                                                }, function () {
                                                    console.log('1');
                                                    self.presentAlert('Falla', 'Imposible Cargar Informacion.');
                                                    self.cargar = false;
                                                    reject();
                                                }
                                                )
                                        }
                                        if(companies.length-1 == key){
                                            self.cargar = false;
                                            resolve();
                                        }
                                    })(key);
                                }                                

                            },
                            function () {
                                console.log('2');
                                reject();
                                self.cargar = false;
                            });

                    }, function () {
                        console.log('3');
                        reject();        
                        self.cargar = false;
                    }
                    )

            }, function () {
                console.log('4');
                reject();
                self.cargar = false;
            }
            )


        });

        return promise;

    }
 
    private async cargarConDatos(cargarAdd) {
        var self = this;

        var conexion = await self.util.getValues('conexion');
        console.log(JSON.stringify(conexion));

        self.item = self.navParams.get('item');
        console.log(conexion);

        if (conexion.is_chofer || conexion.is_guia || conexion.is_promotor) {
            self.add = false
        }

        self.odoo = new OdooApi(global.url, conexion.bd);
        self.cargar = true; 
        self.calendar.eventSource = [];
        self.events = [];

        self.odoo.login(conexion.username, conexion.password).then(
        async function (uid) {

            console.log('cargando guia...');
            var guia = await self.getGuia();
            //console.log(JSON.stringify(guia));
            
            var ids = [];
            var key = null;
            for (key in guia) {
                var dateStart = new Date(String((guia[key]).date_begin).replace(' ', 'T'));
                var dateEnd = new Date(String((guia[key]).date_end).replace(' ', 'T'));
                var startTime = new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate(), dateStart.getHours(), dateStart.getMinutes());
                var endTime = new Date(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate(), dateEnd.getHours(), dateEnd.getMinutes());
                guia[key].startTime = startTime;
                guia[key].endTime = endTime;
                guia[key].title = (guia[key]).tour_id[1];
                //guia[key].title = 'cualquiercosa';
                guia[key].allDay = false;
                guia[key].reservas = [];
                guia[key].futuras = [];
                guia[key].guia_id = guia[key].guia_id ? guia[key].guia_id : '';
                guia[key].observaciones = guia[key].observaciones ? guia[key].observaciones : '';
                guia[key].no_editable = self.add;

                ids.push(guia[key].id);
            }
            
            console.log('cargando middle...');
            var middle = await self.getMiddle(ids);

            key = null;
            for (key in guia) {

                for (var key2 in middle) {
                    if (guia[key].tour_id[0] == middle[key2].tour_id[0] && String((guia[key]).date_begin).substring(0, 10) == String(middle[key2].fecha)) {
                        guia[key].reservas.push(middle[key2]);
                        //console.log(middle[key2]);
                    }
                }
                //                                        self.events.push(guia[key]);

            }
            console.log('cargando futuras...');
            var futuras = await self.getFuturas(ids);
            for (var key_g in guia) {

                for (var key_f in futuras) {
                    //guia[key].reserva_id = middle[key2].id;
                    //                                                    if (guia[key_g].tour_id[0] == futuras[key_f].tour_id[0]) {
                    guia[key_g].futuras.push(futuras[key_f]);
                    //console.log(middle[key2]);
                    //                                                    }
                }
                self.events.push(guia[key_g]);
            }
            
            self.storage.set('guia', self.events);            
            self.calendar.eventSource = self.events;
            

            if(cargarAdd){
                await self.getAdd(conexion,uid);
            }else{

                self.cargar = false;    
            }
            self.cargar = false;    

        },
        function (){
            self.presentAlert('Falla', 'Imposible Cargar Informacion.');
             self.cargar = false;
        });        
        
    }

    private async cargarSinDatos() {

        console.log('cargarSinDatos')
        var self = this;
        self.cargar = true;
        self.calendar.eventSource = [];
        self.events = [];

        var guia = await self.util.getValues('guia');
        if (guia != null) {

            for (var key in guia) {
                guia[key].startTime = new Date(guia[key].startTime);
                guia[key].endTime = new Date(guia[key].endTime);
                self.events.push(guia[key]);
            }
            
            self.cargar = false;

            self.calendar.eventSource = self.events;
        } else {
            self.cargarConDatos(true);
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
    refresh() {
        this.cargarConDatos(true);
    }

    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    changeMode(mode) {
        this.calendar.mode = mode;
    }

    today() {
        this.calendar.currentDate = new Date();
    }
    onEventSelected(evt) {
        console.log(evt);
        this.navCtrl.push(TabsPage, {item: evt});

    }
    addEvent() {
        //this.navCtrl.push(AsignarDetailPage, false);
        var self = this;
        let profileModal = this.modalCtrl.create(AsignarDetailPage, {item:false});
        profileModal.onDidDismiss(data => {
            if (data != null) {
                if (data.nuevo == true) {

                    /*var dateStart = new Date(String((data).date_begin).replace(' ', 'T'));
                    var dateEnd = new Date(String((data).date_end).replace(' ', 'T'));
                    var startTime = new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate(), dateStart.getHours(), dateStart.getMinutes());
                    var endTime = new Date(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate(), dateEnd.getHours(), dateEnd.getMinutes());
                    data.startTime = startTime;
                    data.endTime = endTime;

                    console.log(data);
                    
                    self.storage.get('guia').then((guia) => {

                        guia.push(data);
                        self.storage.set('guia', guia).then((val) => {
                            self.cargarSinDatos();    
                        })

                    });          */          
                    self.cargarConDatos(false);
                }
            }
        });
        profileModal.present();
    }
}
