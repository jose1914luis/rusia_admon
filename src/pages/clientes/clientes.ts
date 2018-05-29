import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, ModalController} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';
import {ClienteDetailPage} from '../../pages/cliente-detail/cliente-detail';
import {Storage} from '@ionic/storage';

declare var OdooApi: any;

@Component({
    selector: 'page-clientes',
    templateUrl: 'clientes.html',
})
export class ClientesPage {

    private items = [];
    private clientes;
    cargar = true;
    private max = 10;

    constructor(public modalCtrl: ModalController, public navCtrl: NavController, private storage: Storage, public navParams: NavParams, public alertCtrl: AlertController) {

    }

    refresh() {
        this.cargarConDatos();
    }

    nuevo() {
        //        this.navCtrl.push(ClienteDetailPage, {item: null});
        var self = this;
        let profileModal = this.modalCtrl.create(ClienteDetailPage, {item: null});
        profileModal.onDidDismiss(data => {
            if (data != null) {
                self.cargarConDatos();
            }
        });
        profileModal.present();
    }

    ionViewDidLoad() {

        this.cargarSinDatos();
    }

    cargarConDatos() {
        var self = this;
        this.cargar = true;
        self.items = [];
        this.storage.get('conexion').then((conexion) => {
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(
                function (uid) {
                    odoo.search_read('tours.clientes.email', [['id', '!=', 0]],
                        ['id']).then(
                        function (email) {
                            console.log(email)
                            var ide = [];
                            for (let key_e in email) {
                                ide.push(email[key_e].id)
                            }
                            self.storage.set('email', email);//<--Todos los emails
                            odoo.search_read('tours.clientes', [['email', 'in', ide]],
                                ['name', 'ilike', 'email', 'telefono', 'nombre_hotel',
                                    'active_email', 'is_padrino', 'pago_tarjeta', 'padre', 'observaciones']).then(
                                function (clientes) {
                                    console.log(clientes);
                                    var ids = [];
                                    for (let key in clientes) {

                                        clientes[key].visible = true;
                                        clientes[key].middle = [];
                                        ids.push(clientes[key].id)
                                    }
                                    self.clientes = clientes;
                                    self.initItems();
                                    self.storage.set('clientes', self.clientes)
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
                        )

                },
                function () {
                    self.presentAlert('Falla', 'Imposible Cargar Datos.');
                    self.cargar = false;
                }
            );
        });
    }

    cargarSinDatos() {
        var self = this;
        this.cargar = true;
        this.storage.get('clientes').then((clientes) => {
            if (clientes != null) {
                //console.log('clientes')
                //console.log(JSON.stringify(clientes));
                //var con = 10;
                

                /*for (var key in clientes) {
                    console.log(JSON.stringify(clientes[key]));
                    self.items.push(clientes[key]);
                }*/
                self.clientes = clientes;
                self.initItems();
                self.cargar = false;
            } else {

                console.log('cargo sin datos');
                self.cargarConDatos();
            }
        })
    }

    private initItems(){

        for (var i = 0; i <  this.clientes.length && i < this.max; i++) {
            this.items.push(this.clientes[i]);
        }
    }

    doInfinite(infiniteScroll) {
        console.log('Begin async operation');

        var self = this;
        setTimeout(() => {
          
          let i;
          for (i = self.max; i < this.clientes.length && i < this.max + 10 ; i++) {
            this.items.push(this.clientes[i]);
          }
          this.max = i;

          console.log('Async operation has ended');
          infiniteScroll.complete();
        }, 500);
      }

    presentAlert(titulo, texto) {
        const alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    }

    buscar() {

        var self = this;
        let alert = this.alertCtrl.create({
            title: 'Buscar',
            inputs: [
                {
                    name: 'nombre',
                    placeholder: 'Nombre'
                },
                {
                    name: 'correo',
                    placeholder: 'Correo'
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
                        //                        console.log(data.nombre);
                        //                        console.log(data.correo);
                        if (data.nombre.length > 2 || data.correo.length > 5) {
                            for (let key in self.items) {

                                self.items[key].visible = false;
                                //                                console.log((self.items[key].name + "").includes(data.nombre + "") + '  ' + (self.items[key].email[1] + "").includes(data.correo + ""));
                                if ((self.items[key].name + "").includes(data.nombre + "") && (self.items[key].email[1] + "").includes(data.correo + "")) {
                                    //                                    console.log(self.items[key]);
                                    self.items[key].visible = true;
                                }
                            }
                        } else {
                            for (let key in self.items) {

                                self.items[key].visible = true;
                            }
                        }

                    }
                }
            ]
        });
        alert.present();
    }

    ejecute(item) {
        //        console.log(item);
        //        this.navCtrl.push(ClienteDetailPage, {item: item});
        //this.navCtrl.push(ClienteDetailPage, {item: item});
        var self = this;
        let profileModal = this.modalCtrl.create(ClienteDetailPage, {item: item});
        profileModal.onDidDismiss(data => {
            if (data != null) {
                self.cargarConDatos();
            }
        });
        profileModal.present();
    }
}
