import { Component } from "@angular/core";
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { Router } from '@angular/router';
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  // title = 'ProjetHotel';

  idleState = 'Not started.';
  timedOut = false;
  min:any;
  sec:any;
  
  constructor(
    public _router: Router,
    public idle: Idle
    
    ) {}

    ionViewDidLoad() {
      this.idle.setIdle(5);  //after 5 sec idle
      this.idle.setTimeout(14400);  //5min countdown
     // this.idle.setTimeout(0.5*60);
      this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
      
      this.idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
      this.idle.onTimeout.subscribe(() => {
        this.idleState = 'Timed out!';
        this.timedOut = true;
        //this.navCtrl.pop();  //go to logout page after 5 min idle.
      });
      this.idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
      this.idle.onTimeoutWarning.subscribe((countdown) => {
      
      
          var data=countdown/60;
          this.min=data.toString().split('.')[0];
          this.sec=     parseFloat(0+'.'+data.toString().split('.')[1])*60;
          this.sec=  (Math.round(this.sec * 100) / 100);
         // console.log(typeof(countdown),countdown)
      
        this.idleState = 'You\'ll logout in ' + this.min+' min ' +this.sec+'  seconds!';
  
        if(countdown == 1){
          console.log('we are here reload')
         
          sessionStorage.clear();
          localStorage.clear();
         this._router.navigate(['/auth'])
          
        }
      });
         this.reload();
    }
    reload() {
      this.idle.watch();
      this.idleState = 'Started.';
      this.timedOut = false;
     
       // sessionStorage.removeItem("infoconnexion")
        // sessionStorage.removeItem("isLoggedIn")
    
     
      //this._router.navigate(['/auth'])
    }

    ngOnInit(): void {
     
       this.ionViewDidLoad()
     }
}
