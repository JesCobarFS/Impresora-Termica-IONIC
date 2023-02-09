import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {

  dispositivios:any
  info:any




  constructor(private  blue: BluetoothSerial,
              private alertCtrl: AlertController) {}

  

 activarBluetooht(){
  this.blue.isEnabled().then(response=>{
    console.log("Bluetooth estas Activo");
    
    this.alert("Bluetooth estas Activo")

    //Busar dispositivos
    this.buscarDispositivos()

  },error=>{
    this.alert("Bluetooth esta apagado")
  })
 }


 buscarDispositivos(){
  this.blue.list().then(response=>{
    this.dispositivios=response
  },error=>{
    this.alert("Error al buscar dispositivos")
  })
 }

 conectarDispositivo(address:string){
  this.blue.connect(address).subscribe((success)=>{
    this.alert("Dispositivo Conectado")
    this.infoDispositivo()
  },(error)=>{
    this.alert(error)
    this.alert("error al conectar")
  })

 }

 desconectarDispositivo(){
  this.blue.disconnect().then(response=>{
    this.alert("Desconectado")
  },error=>{
    this.alert(error)
  })
 }


/*
 imprimir(){
  this.blue.write("<h1>hola como estas</h1>").then(response=>{
    this.alert("Exito al imprimir")
  },error=>{
    this.alert(error)
    this.alert("error al mandar la prueba")
  })
 }
*/

 async imprimir(){

  let zplCommand = '^XA^FO100,100^A0,50,50^FDHello World^FS^XZ';
  this.blue.write(zplCommand).then(success => {
    console.log(success);
  }, error => {
    console.log(error);
  });


 }


 infoDispositivo(){
  this.blue.isConnected().then(connect=>{
    this.info=connect

    this.alert(this.info)
    this.alert("ya estas conectado")
  },error=>{
    this.alert("no esta conectado")
  })
 }



 //Alerta
 async alert(message:String) {
  const alert = await this.alertCtrl.create({
    header: 'Alert',
    subHeader: 'Subtitle',
    message: ""+message,
    buttons: ['OK']
  });
 
  await alert.present();
 }

}
