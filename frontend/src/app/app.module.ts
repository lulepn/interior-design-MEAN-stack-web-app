import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AgencijaComponent } from './agencija/agencija.component';
import { KlijentComponent } from './klijent/klijent.component';
import { AgencijaUlogovanaComponent } from './agencija-ulogovana/agencija-ulogovana.component';
import { KlijentUlogovanComponent } from './klijent-ulogovan/klijent-ulogovan.component';
import { NeregistrovanComponent } from './neregistrovan/neregistrovan.component';
import { KlijentProfilComponent } from './klijent-profil/klijent-profil.component';
import { AgencijaProfilComponent } from './agencija-profil/agencija-profil.component';
import { ObjektiComponent } from './objekti/objekti.component';
import { SkicaPregledComponent } from './skica-pregled/skica-pregled.component';
import { PregledAgencijeComponent } from './pregled-agencije/pregled-agencije.component';
import { AgencijaPosloviComponent } from './agencija-poslovi/agencija-poslovi.component';
import { KlijentPosloviComponent } from './klijent-poslovi/klijent-poslovi.component';
import { PregledZahtevaComponent } from './pregled-zahteva/pregled-zahteva.component';
import { PregledPoslaComponent } from './pregled-posla/pregled-posla.component';
import { PregledPoslaKlijentComponent } from './pregled-posla-klijent/pregled-posla-klijent.component';
import { RecenzijeComponent } from './recenzije/recenzije.component';
import { AdminUlogovanComponent } from './admin-ulogovan/admin-ulogovan.component';
import { AzurirajKlijentaComponent } from './azuriraj-klijenta/azuriraj-klijenta.component';
import { AzurirajAgencijuComponent } from './azuriraj-agenciju/azuriraj-agenciju.component';
import { AgencijaRadniciComponent } from './agencija-radnici/agencija-radnici.component';
import { AdminRadniciComponent } from './admin-radnici/admin-radnici.component';
import { UrediProfilAgComponent } from './uredi-profil-ag/uredi-profil-ag.component';
import { UrediProfilKlComponent } from './uredi-profil-kl/uredi-profil-kl.component';
import { RadniciComponent } from './radnici/radnici.component';
import { UrediRadnikaComponent } from './uredi-radnika/uredi-radnika.component';
import { DodajRadnikaComponent } from './dodaj-radnika/dodaj-radnika.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    AgencijaComponent,
    KlijentComponent,
    AgencijaUlogovanaComponent,
    KlijentUlogovanComponent,
    NeregistrovanComponent,
    KlijentProfilComponent,
    AgencijaProfilComponent,
    ObjektiComponent,
    SkicaPregledComponent,
    PregledAgencijeComponent,
    AgencijaPosloviComponent,
    KlijentPosloviComponent,
    PregledZahtevaComponent,
    PregledPoslaComponent,
    PregledPoslaKlijentComponent,
    RecenzijeComponent,
    AdminUlogovanComponent,
    AzurirajKlijentaComponent,
    AzurirajAgencijuComponent,
    AgencijaRadniciComponent,
    AdminRadniciComponent,
    UrediProfilAgComponent,
    UrediProfilKlComponent,
    RadniciComponent,
    UrediRadnikaComponent,
    DodajRadnikaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
