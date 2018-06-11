import { Component } from '@angular/core';

//Pluggins
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

//Components
import { Platform } from 'ionic-angular';

//Providers
import { HistorialProvider } from '../../providers/historial/historial';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private barcodeScanner: BarcodeScanner,
              private platform: Platform,
              private _historialProvider: HistorialProvider) {}

  scan(){
    if(!this.platform.is("cordova")){
      // this._historialProvider.agregarHistorial("http://google.com");
      // this._historialProvider.agregarHistorial("geo:51.678418,7.809007");
//       this._historialProvider.agregarHistorial( `BEGIN:VCARD
// VERSION:2.1
// N:Kent;Clark
// FN:Clark Kent
// ORG:
// TEL;HOME;VOICE:12345
// TEL;TYPE=cell:67890
// ADR;TYPE=work:;;;
// EMAIL:clark@superman.com
// END:VCARD` );
      this._historialProvider.agregarHistorial("MATMSG:TO:pherrera@test.com;SUB:Probando Aplicación;BODY:A ver que tal queda esta prueba, espero que bien.\r\n\r\nSaludos.;;");
      return;
    }

    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', JSON.stringify(barcodeData));

      if(!barcodeData.cancelled && barcodeData.text != null){
        this._historialProvider.agregarHistorial(barcodeData.text);
      }
    }).catch(err => {
      console.error('Error', err);
      this._historialProvider.mostrarMensaje(`Error: ${err}`);
    });
  }

}
