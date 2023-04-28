import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './views/profile/profile.component';
import { AddressComponent } from './views/address/address.component';

const routes: Routes = [
  { path: '', component: NavbarComponent, children:[
    { path: 'perfil/:id', component: ProfileComponent },
    { path: 'enderecos/:id', component: AddressComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
