import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecomendationsComponent } from './components/recomendations/recomendations.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { RedirectGuard } from './guards/redirect/redirect.guard';
import { ClientGuard } from './guards/client/client.guard';

const routes: Routes = [
  {path:"recommendations", canActivate:[ClientGuard], component:RecomendationsComponent},
  {path:"", canActivate:[RedirectGuard], component:LoginComponent},
  {path:"register", canActivate:[RedirectGuard], component:RegisterComponent},
  {path:"myaccount", canActivate:[ClientGuard],component:MyAccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
