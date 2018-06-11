import { Injectable } from '@angular/core';

import { ScanData } from '../../models/scan-data.model';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { EmailComposer } from '@ionic-native/email-composer';

import { ModalController, Platform, ToastController } from 'ionic-angular';

import { MapasPage } from '../../pages/mapas/mapas';



@Injectable()
export class HistorialProvider {

  private _historial:ScanData[] = [];

  constructor(private iab: InAppBrowser,
              private contacts: Contacts,
              private modalCtrl: ModalController,
              private platform: Platform,
              private toastCtrl: ToastController,
              private emailComposer: EmailComposer) {}

  cargarHistorial(){
    return this._historial;
  }

  agregarHistorial(texto:string){
    let data = new ScanData(texto);
    this._historial.unshift(data);
    console.log(JSON.stringify(this._historial));
    this.abrirScan(0);
  }

  abrirScan(index:number){
    let scanData = this._historial[index];
    console.log(JSON.stringify(scanData));

    switch(scanData.tipo){
      case "http":
        this.iab.create(scanData.info, "_system");
      break

      case "mapa":
        this.modalCtrl.create(MapasPage, {coords:scanData.info}).present();
      break

      case "contacto":
        this.crearContacto(scanData.info);
      break

      case "email":
        this.enviarCorreo(scanData.info);
      break

      default:
        this.mostrarMensaje("Tipo no soportado");
    }
  }

  private enviarCorreo(texto:string){

    texto = texto.replace("MATMSG:","");
    let datosCorreo = texto.split(";");

    let email = {
      to: datosCorreo[0].replace("TO:",""),
      cc: null,
      bcc: null,
      attachments: null,
      subject: datosCorreo[1].replace("SUB:",""),
      body: datosCorreo[2].replace("BODY:",""),
      isHtml: true
    };

    if(!this.platform.is("cordova")){
      console.log(datosCorreo);
      console.warn("No se puede enviar el correo");
      return;
    }

    this.emailComposer.open(email);
  }

  private crearContacto(texto:string){
    let campos:any = this.parse_vcard(texto);
    console.log(JSON.stringify(campos));

    let nombre = campos.fn;
    let tel = campos.tel[0].value[0];

    if(!this.platform.is("cordova")){
      console.warn("No se puede crear el contacto");
      return;
    }

    let contact: Contact = this.contacts.create();

    contact.name = new ContactName(null, nombre);
    contact.phoneNumbers = [new ContactField('movil', tel)];
    contact.save().then(
      () => this.mostrarMensaje(`Contacto ${nombre} creado`),
      (error: any) => this.mostrarMensaje(`Error: ${error}`)
    );
  }

  mostrarMensaje(mensaje:string) {
    const toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

  private parse_vcard( input:string ) {

    var Re1 = /^(version|fn|title|org):(.+)$/i;
    var Re2 = /^([^:;]+);([^:]+):(.+)$/;
    var ReKey = /item\d{1,2}\./;
    var fields = {};

    input.split(/\r\n|\r|\n/).forEach(function (line) {
        var results, key;

        if (Re1.test(line)) {
            results = line.match(Re1);
            key = results[1].toLowerCase();
            fields[key] = results[2];
        } else if (Re2.test(line)) {
            results = line.match(Re2);
            key = results[1].replace(ReKey, '').toLowerCase();

            var meta = {};
            results[2].split(';')
                .map(function (p, i) {
                var match = p.match(/([a-z]+)=(.*)/i);
                if (match) {
                    return [match[1], match[2]];
                } else {
                    return ["TYPE" + (i === 0 ? "" : i), p];
                }
            })
                .forEach(function (p) {
                meta[p[0]] = p[1];
            });

            if (!fields[key]) fields[key] = [];

            fields[key].push({
                meta: meta,
                value: results[3].split(';')
            })
        }
    });

    return fields;
  };

}
