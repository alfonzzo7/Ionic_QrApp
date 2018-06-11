import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ScanData } from '../../models/scan-data.model';

//Providers
import { HistorialProvider } from '../../providers/historial/historial';

@Component({
  selector: 'page-guardados',
  templateUrl: 'guardados.html',
})
export class GuardadosPage {

  historial:ScanData[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _historialProvider: HistorialProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuardadosPage');
    this.historial = this._historialProvider.cargarHistorial();
  }

  abrirScan(index:number){
    this._historialProvider.abrirScan(index);
  }

}
