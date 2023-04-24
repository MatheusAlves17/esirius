import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './views/profile/profile.component';

const routes: Routes = [
  { path: '', component: NavbarComponent, children:[
    { path: 'perfil/:id', component: ProfileComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
