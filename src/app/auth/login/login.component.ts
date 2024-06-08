import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  StatutForm:Boolean=false
  formLogin:any={}
  formNewCompte:any={}
  RetoursChargement:any=[]
  RetoursCompte:any=[]
  constructor(
    public AuthService: AuthService
  ) {}



  changeStep(event: Event){
    event.preventDefault();
    this.StatutForm = true
  }
  Login(){
    // this.AuthService.ShowLoader()
   
   // window.location.href = 'admin/'
   let Options = 'HydrographieServices.svc/pvgLogin'

    let body = {
      "Objets": [
          {
              "OE_PARAM": [
                  "0001",
                  this.formLogin.login,
                  this.formLogin.mdp
              ],
              "clsObjetEnvoi": {
                  "ET_CODEETABLISSEMENT": "",
                  "AN_CODEANTENNE": "",
                  "TYPEOPERATION": "01"
              }
          }
      ]
  };
  this.AuthService.ShowLoader()

    this.AuthService.AppelServiceweb(body, Options).subscribe((success: any) => {
      this.RetoursChargement = success
      this.RetoursChargement = this.RetoursChargement.pvgLoginResult
      this.AuthService.CloseLoader()
      if (this.RetoursChargement[0].clsResultat.SL_RESULTAT == 'FALSE') {
       //@ts-ignore
       toastr.error('Connexion impossible, veuillez revoir vos accès !!!', "error");
      }
       else {
       //@ts-ignore
        toastr.success('Connexion effectuée avec succès !!!', "Succès");
        sessionStorage.setItem('isLoggedIn', 'true');
        this.formLogin.login = ''
        this.formLogin.mdp = ''
        sessionStorage.setItem(
          'infoLogin',
          JSON.stringify(this.RetoursChargement)
        );
        window.location.href = '/admin';
      }
    },(error) => {
      this.AuthService.CloseLoader()
      //@ts-ignore
      toastr.warning('Veuillez réessayer svp !!!', "warning");
    }
    );
  }
  NewCompte(){
  
   let Options = 'HydrographieServices.svc/pvgMajAgent'

    let body = {
      "Objets": [
          {
              "AN_CODEANTENNE": "1000",
              "AG_CODEAGENT": "",
              "AG_NOMPRENOMSAGENT": this.formNewCompte.nom,
              "AG_TELEPHONEAGENT":"2250000000000",
              "AG_EMAILAGENT": this.formNewCompte.email,
              "CO_CODECOMPTE":"38",
              "PO_CODEPROFIL":"01",
              "SE_CODESERVICE":"01",
              "NA_CODENATUREAGENT":"01",
              "AG_ADRESSEGEOGRAPHIQUEAGENT":"azee",
               "TU_CODETYPECOMPTEUTILISATEUR":"1",
              "CU_LOGIN":this.formNewCompte.login,
              "CU_PWD":this.formNewCompte.mdp,
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
      this.RetoursCompte = this.RetoursCompte.pvgMajAgentResult
      this.AuthService.CloseLoader()
      if (this.RetoursCompte.clsResultat.SL_RESULTAT == 'FALSE') {
       //@ts-ignore
       toastr.error(this.RetoursCompte.clsResultat.SL_MESSAGE, "error");
      }
       else {
       //@ts-ignore
        toastr.success('Opération effectuée avec succès', "Succès");
       
        this.formNewCompte.nom = ''
        this.formNewCompte.email = ''
        this.formNewCompte.login = ''
        this.formNewCompte.mdp = ''
       
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    },(error) => {
      this.AuthService.CloseLoader()
      //@ts-ignore
      toastr.warning('Veuillez réessayer svp !!!', "warning");
    }
    );
  }
  ngOnInit(): void {
    if (sessionStorage.getItem('isLoggedIn')) {
      window.location.href = '/admin';
    }
   }
}
