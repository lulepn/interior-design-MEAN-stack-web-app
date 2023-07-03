import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRadniciComponent } from './admin-radnici/admin-radnici.component';
import { AdminUlogovanComponent } from './admin-ulogovan/admin-ulogovan.component';
import { AdminComponent } from './admin/admin.component';
import { AgencijaPosloviComponent } from './agencija-poslovi/agencija-poslovi.component';
import { AgencijaProfilComponent } from './agencija-profil/agencija-profil.component';
import { AgencijaUlogovanaComponent } from './agencija-ulogovana/agencija-ulogovana.component';
import { AgencijaComponent } from './agencija/agencija.component';
import { AzurirajAgencijuComponent } from './azuriraj-agenciju/azuriraj-agenciju.component';
import { AzurirajKlijentaComponent } from './azuriraj-klijenta/azuriraj-klijenta.component';
import { DodajRadnikaComponent } from './dodaj-radnika/dodaj-radnika.component';
import { KlijentPosloviComponent } from './klijent-poslovi/klijent-poslovi.component';
import { KlijentProfilComponent } from './klijent-profil/klijent-profil.component';
import { KlijentUlogovanComponent } from './klijent-ulogovan/klijent-ulogovan.component';
import { KlijentComponent } from './klijent/klijent.component';
import { LoginComponent } from './login/login.component';
import { NeregistrovanComponent } from './neregistrovan/neregistrovan.component';
import { ObjektiComponent } from './objekti/objekti.component';
import { PregledAgencijeComponent } from './pregled-agencije/pregled-agencije.component';
import { PregledPoslaKlijentComponent } from './pregled-posla-klijent/pregled-posla-klijent.component';
import { PregledPoslaComponent } from './pregled-posla/pregled-posla.component';
import { PregledZahtevaComponent } from './pregled-zahteva/pregled-zahteva.component';
import { RadniciComponent } from './radnici/radnici.component';
import { RecenzijeComponent } from './recenzije/recenzije.component';
import { SkicaPregledComponent } from './skica-pregled/skica-pregled.component';
import { UrediProfilAgComponent } from './uredi-profil-ag/uredi-profil-ag.component';
import { UrediProfilKlComponent } from './uredi-profil-kl/uredi-profil-kl.component';
import { UrediRadnikaComponent } from './uredi-radnika/uredi-radnika.component';

const routes: Routes = [
  {path:"", component : LoginComponent},
  {path:"registerA", component : AgencijaComponent},
  {path:"registerK", component : KlijentComponent},
  {path:"admin", component : AdminComponent},
  {path:"agencija", component : AgencijaUlogovanaComponent},
  {path:"klijent", component : KlijentUlogovanComponent},
  {path:"noregister", component : NeregistrovanComponent},
  {path:"klijentProfil", component : KlijentProfilComponent},
  {path:"agencijaProfil", component : AgencijaProfilComponent},
  {path:"objekti", component : ObjektiComponent},
  {path:"skicaPregled", component : SkicaPregledComponent},
  {path:"pregledAgencije", component : PregledAgencijeComponent},
  {path:"agencijaPoslovi", component : AgencijaPosloviComponent},
  {path:"klijentPoslovi", component : KlijentPosloviComponent},
  {path:"pregledajZahtev", component : PregledZahtevaComponent},
  {path:"pregledajPosao", component : PregledPoslaComponent},
  {path:"pregledajPosaoKlijent", component : PregledPoslaKlijentComponent},
  {path:"recenzija", component : RecenzijeComponent},
  {path:"adminUlogovan", component : AdminUlogovanComponent},
  {path:'azurirajKlijenta', component : AzurirajKlijentaComponent},
  {path:'azurirajAgenciju', component : AzurirajAgencijuComponent},
  {path:'adminRadnici', component : AdminRadniciComponent},
  {path:'urediProfilAg', component : UrediProfilAgComponent},
  {path:'urediProfilKl', component : UrediProfilKlComponent},
  {path:'agencijaRadnici', component : RadniciComponent},
  {path:'urediRadnika', component : UrediRadnikaComponent},
  {path:'dodajRadnika', component : DodajRadnikaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
