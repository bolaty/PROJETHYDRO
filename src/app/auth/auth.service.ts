import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
declare var $: any;
import  Swal  from "sweetalert2"
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  LienServeur: any = "http://127.0.0.1:8085/"; // lien serveur

  constructor(private http: HttpClient) {}
  
  AppelServiceweb(body: any, Options: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: '',
      }),
    };
  
    return this.http.post(
      this.LienServeur + Options,
      body,
      httpOptions
    );
  }

  ShowLoader(){
    Swal.fire({
      allowOutsideClick: false
    })
    Swal.showLoading()
  }
  CloseLoader(){
    Swal.close()
  }

  isLoggedinUser() {
    return !!sessionStorage.getItem('isLoggedIn');
    
  }
}