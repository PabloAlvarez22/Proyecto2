import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecomendationsComponent } from './components/recomendations/recomendations.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MyAccountComponent } from './components/my-account/my-account.component';

const routes: Routes = [
  {path:"recommendations", component:RecomendationsComponent},
  {path:"",  component:LoginComponent},
  {path:"register",  component:RegisterComponent},
  {path:"myaccount",component:MyAccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
