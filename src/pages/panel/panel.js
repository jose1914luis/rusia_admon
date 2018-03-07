var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../../pages/home/home';
import { ListPage } from '../../pages/list/list';
import { AsignarPage } from '../../pages/asignar/asignar';
import { CiudadPage } from '../../pages/ciudad/ciudad';
import { ClientesPage } from '../../pages/clientes/clientes';
import { NomPage } from '../../pages/nom/nom';
import { PagoPage } from '../../pages/pago/pago';
import { SalarioPage } from '../../pages/salario/salario';
import { SolPage } from '../../pages/sol/sol';
//@IonicPage()
var PanelPage = /** @class */ (function () {
    function PanelPage(navCtrl, navParams, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.rootPage = AsignarPage;
        var self = this;
        this.storage.get('conexion').then(function (conexion) {
            //            console.log('-----x-----');
            console.log(conexion);
            if (conexion.is_guia || conexion.is_promotor) {
                // console.log(conexion.is_guia);
                self.pages = [
                    { title: 'Tours Asignados', component: AsignarPage },
                    { title: 'Nomina', component: NomPage },
                    { title: 'Pago Diario', component: PagoPage },
                    { title: 'Salir', component: ListPage }
                ];
            }
            else if (conexion.is_chofer) {
                self.pages = [
                    { title: 'Tours Asignados', component: AsignarPage },
                    { title: 'Salir', component: ListPage }
                ];
            }
            else {
                console.log('deberia entrar aca');
                self.pages = [
                    { title: 'Ciudades', component: CiudadPage },
                    { title: 'Asignar Guía', component: AsignarPage },
                    { title: 'Clientes', component: ClientesPage },
                    { title: 'Solicitudes', component: SolPage },
                    { title: 'Nomina', component: NomPage },
                    { title: 'Pago Diario', component: PagoPage },
                    { title: 'Salario Guías', component: SalarioPage },
                    { title: 'Gastos Extras', component: HomePage },
                    { title: 'Salir', component: ListPage }
                ];
            }
        });
    }
    PanelPage.prototype.openPage = function (page) {
        if (page.title == "Salir") {
            this.nav.setRoot(page.component, { borrar: true });
        }
        else {
            this.nav.setRoot(page.component);
        }
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], PanelPage.prototype, "nav", void 0);
    PanelPage = __decorate([
        Component({
            selector: 'page-panel',
            templateUrl: 'panel.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Storage])
    ], PanelPage);
    return PanelPage;
}());
export { PanelPage };
//# sourceMappingURL=panel.js.map