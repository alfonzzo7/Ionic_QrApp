import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-mapas',
  templateUrl: 'mapas.html',
})
export class MapasPage {

  lat: number;
  lng: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController) {
    let coordsArray = this.navParams.get("coords").split(",");
    this.lat = Number(coordsArray[0].replace("geo:",""));
    this.lng = Number(coordsArray[1]);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapasPage');
  }

  cerrar(){
    this.viewCtrl.dismiss();
  }

}
