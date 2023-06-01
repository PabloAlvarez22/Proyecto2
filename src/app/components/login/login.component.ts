import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { OPTIONS } from 'src/app/models/ConfigNotifications';
import { User } from 'src/app/models/User';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user:User;

  constructor(private router: Router, private notification:NotificationsService, private restUser:RestUserService) { 
    this.user = new User('','','','',null,'','');
  }

  ngOnInit(): void {
  }


  login(){
    this.restUser.login(this.user).subscribe((res:any)=>{
      if(res.find){
        delete res.find.password;
        localStorage.setItem("user",JSON.stringify(res.find));
        localStorage.setItem("token", JSON.stringify(res.token));
        this.notification.create("Operación exitosa",res.message, NotificationType.Success,OPTIONS, "");
        this.user = this.restUser.getUser();
        this.router.navigateByUrl("recommendations");
      }else{
        this.notification.create("Error",res.message, NotificationType.Error,OPTIONS, "");
      }
    }, error=>{
      console.log(error);
      this.notification.create("Error General",error.error.message, NotificationType.Error,OPTIONS, "");
      
    })
  }


}
