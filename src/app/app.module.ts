import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule,NgIdleKeepaliveModule,HttpClientModule],
  providers: [ ],
  bootstrap: [AppComponent],
})
export class AppModule {}
