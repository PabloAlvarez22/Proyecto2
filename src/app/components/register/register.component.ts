import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationType, NotificationsService } from 'angular2-notifications';
import { OPTIONS } from 'src/app/models/ConfigNotifications';
import { User } from 'src/app/models/User';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user:User;

  constructor(private router: Router, private notification:NotificationsService, private restUser:RestUserService) { 
    this.user = new User('','','','',null,'','');
  }

  ngOnInit(): void {
  }


  register(){
    this.restUser.register(this.user).subscribe((res:any)=>{
      if(res.find){
        this.notification.create("Operación exitosa",res.message, NotificationType.Success,OPTIONS, "");
        this.router.navigateByUrl("");
      }else{
        this.notification.create("Error",res.message, NotificationType.Error,OPTIONS, "");
      }
    }, error=>{
      console.log(error);
      this.notification.create("Error General",error.error.message, NotificationType.Error,OPTIONS, "");
      
    })
  }

}
