import { Component, LOCALE_ID } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as CryptoJS from 'crypto-js';
import { Base64 } from 'js-base64';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'encriptacion';

  dispositivo: string;
  fecha: string;
  nombre_app: string;
  token: string;
  version_app: string;

  encryptkey;

  

  constructor(private datePipe:DatePipe){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //this.concatenar('6b95bc74-50ba-4724-bb57-d990f693a46b','99','0.0.4');
    //this.getDateWithFormat();
    //this.encryptWithAES();
  }

  concatenar(mac:string,canal:string,versionApp:string):string{

    this.fecha = this.getDateWithFormat();
    return mac + canal + versionApp + this.fecha;
  }

  getDateWithFormat():string{
    let localDate = new Date();

    let str1:string = this.datePipe.transform(localDate,'yyyyMMddHHmmss');
    let gmtInMinutes:number= new Date().getTimezoneOffset();
    localDate.setHours(gmtInMinutes/60);
    localDate.setMinutes(0);
    localDate.setSeconds(0);
    
    let str2:string = '0000-';
    let str3:string = this.datePipe.transform(localDate,'HH:mm:ss');

    return str1 + str2 + str3;

  }


  encryptWithAES(msg,pass){

    /* let workingKey:string = '0iZguBMOZ6IUYxMwfn70v+k5aXAPL0CG0YY1MESuHXs=';
    let initializationVector:string = 'b9ix1/HLZ7z3S3FnOUM9oA==';

    let workingKeyDecode = Base64.decode(workingKey);
    let initializationVectorDecode = Base64.decode(initializationVector);

    let strAcutal: string = this.concatenar('6b95bc74-50ba-4724-bb57-d990f693a46b','99','0.0.4');

    let strAgregado = strAcutal + workingKeyDecode + initializationVectorDecode; */
    
     this.encryptkey = CryptoJS.AES.encrypt(msg, pass, {
      //iv: iv,
      padding: CryptoJS.pad.Pkcs5,
      mode: CryptoJS.mode.CBC
      });

      //Encripta con base 64

      return this.encryptkey;
    

  }

  encryptWithBase64(word:string){
    CryptoJS.enc.Base64.parse(word);
    return word;
  }




}
