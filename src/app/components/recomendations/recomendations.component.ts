import { Component, OnInit } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { OPTIONS } from 'src/app/models/ConfigNotifications';
import { Shoes } from 'src/app/models/Shoes';
import { CONNECTION } from 'src/app/services/global';
import { RestShoesService } from 'src/app/services/restShoes/rest-shoes.service';

@Component({
  selector: 'app-recomendations',
  templateUrl: './recomendations.component.html',
  styleUrls: ['./recomendations.component.css']
})
export class RecomendationsComponent implements OnInit {
  public firstShoe:Shoes;
  public uri;
  public shoesBrand: any[];
  public shoesStyle: any[];
  public shoesFavorite: any[];
  public search="";
  public shoesFavoriteByMaterialSole: any[];
  constructor(private notification:NotificationsService, private restShoes:RestShoesService) { 
    this.firstShoe = new Shoes('','','','','','',null);
    this.shoesBrand=[];
    this.shoesStyle=[];
    this.shoesFavorite=[];
    this.getShoesByUser();
    this.uri = CONNECTION.URI;
    this.getShoeByBrand();
    this.getShoeByStyle();
    this.getFavorites();

    this.getByMaterialSoleShoes();
  }

  ngOnInit(): void {
  }

  getShoesByUser(){
    this.restShoes.getShoesByUser().subscribe((res:any)=>{
      if(res.nodes){
        this.firstShoe = res.nodes._fields[0].properties;
      }else{
        this.firstShoe = new Shoes('','','','','','',null);
      }
    }, error=>{
      this.notification.create("Error",error.error.message, NotificationType.Error,OPTIONS, "");
    })
  }


  getShoeByBrand(){
    this.restShoes.getShoeByBrand().subscribe((res:any)=>{
      if(res.nodes){
        let nodes:any=res.nodes;
        nodes.forEach(element => {
          this.shoesBrand.push(element._fields[0].properties);
        });
      }else{
      }
    }, error=>{
      this.notification.create("Error",error.error.message, NotificationType.Error,OPTIONS, "");
    })
  }


  getShoeByStyle(){
    this.restShoes.getShoeByStyle().subscribe((res:any)=>{
      if(res.nodes){
        let nodes:any=res.nodes;
        nodes.forEach(element => {
          this.shoesStyle.push(element._fields[0].properties);
        });
      }else{
      }
    }, error=>{
      this.notification.create("Error",error.error.message, NotificationType.Error,OPTIONS, "");
    })
  }


  setRelation(shoe){
    let params = {
      "email":this.restShoes.getUser().email,
      "name":shoe.name
    }
    this.restShoes.setRelation(params).subscribe((res:any)=>{
      this.notification.create("Información",res.message, NotificationType.Success,OPTIONS, "");
      this.getFavorites();
    }, error=>{
      this.notification.create("Error",error.error.message, NotificationType.Error,OPTIONS, "");
    })
  }


  getFavorites(){
    this.shoesFavorite=[];
    this.restShoes.getFavorites().subscribe((res:any)=>{
      if(res.nodes){
        let nodes:any=res.nodes;
        nodes.forEach(element => {
          this.shoesFavorite.push(element._fields[0].properties);
        });
      }else{
      }
    }, error=>{
      this.notification.create("Error",error.error.message, NotificationType.Error,OPTIONS, "");
    })
  }


  getByMaterialSoleShoes(){
    this.shoesFavoriteByMaterialSole=[];
    this.restShoes.getByMaterialSoleShoes().subscribe((res:any)=>{
      if(res.nodes){
        let nodes:any=res.nodes;
        let flag=true;
        nodes.forEach(element => {

          this.shoesFavoriteByMaterialSole.push(element._fields[0].properties);

        });
      }else{
      }
    }, error=>{
      this.notification.create("Error",error.error.message, NotificationType.Error,OPTIONS, "");
    })
  }
}
