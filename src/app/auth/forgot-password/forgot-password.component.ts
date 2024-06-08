import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
declare var $: any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  statutForm:boolean=false
  statutFormCode:boolean=false
  formrecupEmail:any={}
  formrecupNewMdp:any={}
  RetoursCompte:any=[]
  constructor(
    public AuthService: AuthService
  ) {}

  chargeForm1(){
    this.statutForm = true
    this.statutFormCode = false
    var pointer = this
    setTimeout(()=>{
      pointer.chargeformulaire();
    },2000)

  }
  chargeForm(){
    this.statutForm = true
    this.statutFormCode = true
  }

  chargeformulaire(){
    var pointer = this
   // var code = '5522'
    var code = this.RetoursCompte[0].MO_CODEVALIDATION.slice(0,4);
    var otp_inputs = document.querySelectorAll(".otp__digit")
      var mykey = "0123456789".split("")
      otp_inputs.forEach((_)=>{
        _.addEventListener("keyup", handle_next_input)
      })//@ts-ignore
      function handle_next_input(event){
        let current = event.target
        let index = parseInt(current.classList[1].split("__")[2])
        current.value = event.key
        
        if(event.keyCode == 8 && index > 1){
          current.previousElementSibling.focus()
        }
        if(index < 4 && mykey.indexOf(""+event.key+"") != -1){
          var next = current.nextElementSibling;
          next.focus()
        }
        var _finalKey = ""
        //@ts-ignore
        for(let {value} of otp_inputs){
            _finalKey += value
        }
        
        if(_finalKey.length == 4){
          
          if(_finalKey == code){//@ts-ignore
            document.querySelector("#_otp").classList.replace("_notok", "_ok")
            var elm = document.getElementById("_otpInfo");//@ts-ignore
            elm.style.color = "green";
            //@ts-ignore
            document.querySelector("#_otp").innerText = _finalKey 
             //@ts-ignore
            document.querySelector("#_otpInfo").innerText = "Code de validation vérifié !" 
           
            setTimeout(()=>{
              pointer.chargeForm()
             // sessionStorage.setItem('isLoggedIn', 'true');
             // sessionStorage.setItem('insert_mouchard', 'true');
             // window.location.href = '/client/acceuil'
            },2000)
          }else{//@ts-ignore
            document.querySelector("#_otp").classList.replace("_ok", "_notok")
            var elm = document.getElementById("_otpInfo");//@ts-ignore
            elm.style.color = "red";
            //@ts-ignore
            document.querySelector("#_otp").innerText = _finalKey
            //@ts-ignore
            document.querySelector("#_otpInfo").innerText = "Code de validation incorrect !"
           
          }
        }else{//@ts-ignore
          document.querySelector("#_otp").classList.replace("_ok", "_notok")
          //@ts-ignore
          document.querySelector("#_otp").innerText = _finalKey
        }
      }
      
  }
  NewCompte(){
  
    let Options = 'HydrographieServices.svc/pvgForgotPassword'
 
     let body = {
      "Objets": [
          {
              "MO_CONTACT": this.formrecupEmail.email,
              "MO_CODEVALIDATION": "",
              "TU_CODETYPEUTILISATEUR": "1",
              "CU_MOTDEPASSE": "",
              "CU_CODECOMPTEUTILISATEUR":"",
              "clsObjetEnvoi": {
                  "ET_CODEETABLISSEMENT": "",
                  "AN_CODEANTENNE": "",
                  "TYPEOPERATION": "0"
              }
          }
      ]
  }
   this.AuthService.ShowLoader()
 
     this.AuthService.AppelServiceweb(body, Options).subscribe((success: any) => {
       this.RetoursCompte = success
       this.RetoursCompte = this.RetoursCompte.pvgForgotPasswordResult
       this.AuthService.CloseLoader()
       if (this.RetoursCompte[0].clsResultat.SL_RESULTAT == 'FALSE') {
        //@ts-ignore
        toastr.error(this.RetoursCompte[0].clsResultat.SL_MESSAGE, "error");
       }
        else {
        //@ts-ignore
         toastr.success('Opération effectue avec succès, veuillez recevoir votre code de validation !!!', "Succès");
         sessionStorage.setItem(
          'infocompte',
          JSON.stringify(this.RetoursCompte)
         );
         this.formrecupEmail.email= ''
        
         setTimeout(() => {
           this.chargeForm1()
         }, 2000);
       }
     },(error) => {
       this.AuthService.CloseLoader()
       //@ts-ignore
       toastr.warning('Veuillez réessayer svp !!!', "warning");
     }
     );
   }

  ReplacePassword(){
    let codSL_MOTPASSE = this.formrecupNewMdp.newMdp;
    this.formrecupNewMdp.newMdp = codSL_MOTPASSE.trim();
    
    let codSL_MOTPASSE_CONFIRM = this.formrecupNewMdp.confirmMdp;
    this.formrecupNewMdp.confirmMdp = codSL_MOTPASSE_CONFIRM.trim();

    if(this.formrecupNewMdp.newMdp !== this.formrecupNewMdp.confirmMdp){
      //@ts-ignore
      toastr.error('Mot de passe non conforme !!!', "error");
    }else{
      let Options = 'HydrographieServices.svc/pvgForgotPassword'
      //@ts-ignore
      var recupInfo = JSON.parse(sessionStorage.getItem('infocompte'))
      let body = {
        "Objets": [
            {
                "MO_CONTACT": this.RetoursCompte[0].MO_CONTACT == '' ? recupInfo[0].MO_CONTACT : this.RetoursCompte[0].MO_CONTACT,
                "MO_CODEVALIDATION": this.RetoursCompte[0].MO_CODEVALIDATION == '' ? recupInfo[0].MO_CODEVALIDATION : this.RetoursCompte[0].MO_CODEVALIDATION,
                "TU_CODETYPEUTILISATEUR": "1",
                "CU_MOTDEPASSE": this.formrecupNewMdp.newMdp,
                "CU_CODECOMPTEUTILISATEUR":this.RetoursCompte[0].CU_CODECOMPTEUTILISATEUR == '' ? recupInfo[0].CU_CODECOMPTEUTILISATEUR : this.RetoursCompte[0].CU_CODECOMPTEUTILISATEUR,
                "clsObjetEnvoi": {
                    "ET_CODEETABLISSEMENT": "",
                    "AN_CODEANTENNE": "",
                    "TYPEOPERATION": "1"
                }
            }
        ]
    }
     this.AuthService.ShowLoader()
  
      this.AuthService.AppelServiceweb(body, Options).subscribe((success: any) => {
        this.RetoursCompte = success
        this.RetoursCompte = this.RetoursCompte.pvgForgotPasswordResult
        this.AuthService.CloseLoader()
        if (this.RetoursCompte[0].clsResultat.SL_RESULTAT == 'FALSE') {
         //@ts-ignore
         toastr.error("Échec du service, veuillez Consulter l'admin !!!", "error");
        }
         else {
         //@ts-ignore
          toastr.success(this.RetoursCompte[0].clsResultat.SL_MESSAGE, "Succès");
          setTimeout(() => {
           window.location.reload()
          }, 2000);
        }
      },(error) => {
        this.AuthService.CloseLoader()
        //@ts-ignore
        toastr.warning('Veuillez réessayer svp !!!', "warning");
      }
      );

    }
    
   }
  ngOnInit() {
   /* setTimeout(()=>{
      this.chargeform();
    },2000)*/
  }
}
