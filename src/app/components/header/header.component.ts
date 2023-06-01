import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'sx-front';
  navbarOpened= false;
  public  element;
  public token;
 

  public user:User;
  public userRole;
  public modo;
  constructor(public loader: LoaderService, private router:Router,private restUser:RestUserService){
  
      let value = localStorage.getItem("modo")

      if(value=="prueba"){
        this.modo = true;
      }else{
        this.modo = false;
      }
  }

  

  ngOnInit():void{
    
  }


  logOut(){
    localStorage.clear();
    localStorage.clear();
    this.router.navigateByUrl("");
  }




  ngDoCheck(){
    this.getToken();
    this.user = this.restUser.getUser();
  }



  getToken(){
    if(localStorage.getItem("token") != undefined){
      this.token = localStorage.getItem("token");
    }else{
      this.token = null;
    }
  }

 


 
}
