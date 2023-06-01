import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeShoe'
})
export class PipeShoePipe implements PipeTransform {

  transform(shoes:any, search: any): any {
    if(search == undefined || search==""){
        return shoes;
    }else{
      shoes = shoes.filter(  shoe=>{
        if(shoe.name.toLowerCase().includes(search.toLowerCase())){
          return shoe.name.toLowerCase().includes(search.toLowerCase());
        
        }
      
      });

      return shoes;
    }
  }

}
