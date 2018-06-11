import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//Mapas
import { AgmCoreModule } from '@agm/core';

//Pluggins
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Contacts } from '@ionic-native/contacts';
import { EmailComposer } from '@ionic-native/email-composer';

import { MyApp } from './app.component';
import { HomePage,
         TabsPage,
         GuardadosPage,
         MapasPage
       } from '../pages/index.paginas';

import { HistorialProvider } from '../providers/historial/historial';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    GuardadosPage,
    MapasPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBHiJzOmD2NylZ9bbQ09kL_JXv5wa_yWaI'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    GuardadosPage,
    MapasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    InAppBrowser,
    Contacts,
    EmailComposer,
    HistorialProvider
  ]
})
export class AppModule {}
