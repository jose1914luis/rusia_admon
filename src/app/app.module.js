var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AsignarPage } from '../pages/asignar/asignar';
import { CiudadPage } from '../pages/ciudad/ciudad';
import { ClientesPage } from '../pages/clientes/clientes';
import { NomPage } from '../pages/nom/nom';
import { PagoPage } from '../pages/pago/pago';
import { SalarioPage } from '../pages/salario/salario';
import { SolPage } from '../pages/sol/sol';
import { SincPage } from '../pages/sinc/sinc';
import { ReservasPage } from '../pages/reservas/reservas';
import { FuturasPage } from '../pages/futuras/futuras';
import { PanelPage } from '../pages/panel/panel';
import { TabsPage } from '../pages/tabs/tabs';
import { CityDetailPage } from '../pages/city-detail/city-detail';
import { TourDetailPage } from '../pages/tour-detail/tour-detail';
import { SalarioDetailPage } from '../pages/salario-detail/salario-detail';
import { PagoDetailPage } from '../pages/pago-detail/pago-detail';
import { ClienteDetailPage } from '../pages/cliente-detail/cliente-detail';
import { NomDetailPage } from '../pages/nom-detail/nom-detail';
import { AsignarDetailPage } from '../pages/asignar-detail/asignar-detail';
import { ResDetailPage } from '../pages/res-detail/res-detail';
import { NomFilterPage } from '../pages/nom-filter/nom-filter';
import { GastosFilterPage } from '../pages/gastos-filter/gastos-filter';
import { BuscarTourPage } from '../pages/buscar-tour/buscar-tour';
import { BuscarGuiaPage } from '../pages/buscar-guia/buscar-guia';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { NgCalendarModule } from 'ionic2-calendar';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                HomePage,
                ListPage,
                AsignarPage,
                CiudadPage,
                ClientesPage,
                NomPage,
                PagoPage,
                SalarioPage,
                SolPage,
                SincPage,
                CityDetailPage,
                TourDetailPage,
                SalarioDetailPage,
                PagoDetailPage,
                ClienteDetailPage,
                NomDetailPage,
                AsignarDetailPage,
                ReservasPage,
                FuturasPage,
                TabsPage,
                ResDetailPage,
                NomFilterPage,
                PanelPage,
                GastosFilterPage,
                BuscarGuiaPage,
                BuscarTourPage
            ],
            imports: [
                BrowserModule,
                NgCalendarModule,
                IonicModule.forRoot(MyApp),
                IonicStorageModule.forRoot()
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                HomePage,
                ListPage,
                AsignarPage,
                CiudadPage,
                ClientesPage,
                NomPage,
                PagoPage,
                SalarioPage,
                SolPage,
                SincPage,
                CityDetailPage,
                TourDetailPage,
                SalarioDetailPage,
                PagoDetailPage,
                ClienteDetailPage,
                NomDetailPage,
                AsignarDetailPage,
                ReservasPage,
                FuturasPage,
                TabsPage,
                ResDetailPage,
                NomFilterPage,
                PanelPage,
                GastosFilterPage,
                BuscarGuiaPage,
                BuscarTourPage
            ],
            providers: [
                Clipboard,
                Network,
                StatusBar,
                SplashScreen,
                { provide: ErrorHandler, useClass: IonicErrorHandler }
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map