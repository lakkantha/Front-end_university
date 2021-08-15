import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";
import {Province,District,City,Administrative_Center} from "../Modal/PostalCode";

@Injectable({
  providedIn: 'root'
})

 
export class PostalCodeService {

  Url = environment.base_url+"/province/get/all";
  District = environment.base_url+"/district/get-by-province";
  City =environment.base_url+"/city/get";
  Administrative_Center =environment.base_url+"/rgt-admin-center/get-all";
  save = environment.base_url+"/define-postal-code-administrative-center/create";
  postalcode = environment.base_url+"/postal-code/get";
  update = environment.base_url+"/define-postal-code-administrative-center/update";
  delete = environment.base_url+"/define-postal-code-administrative-center/delete";
  veiw = environment.base_url+"/define-postal-code-administrative-center/get-all";

  constructor(private http: HttpClient) { }

  getProvince():Observable<Province[]>{
    const uri = `${this.Url}`;
    return this.http.get<Province[]>(uri);

  }
  getDistrict(value):Observable<District[]>{
    const uri = `${this.District}`;
    return this.http.get<District[]>(uri+"/"+value);

  }
  getCity(value1,value2):Observable<City[]>{
    const uri = `${this.City}`;
    return this.http.get<City[]>(uri+"/"+value1+"/"+value2);

  }

  getPostalCode(value1):Observable<City[]>{
    const uri = `${this.postalcode}`;
    return this.http.get<City[]>(uri+"/"+value1);

  }
  getAdministrativeCenter():Observable<Administrative_Center[]>{
    const uri = `${this.Administrative_Center}`;
    return this.http.get<Administrative_Center[]>(uri);

  }
 

  Postdata(body){
    return this.http.post(`${this.save}`,body);
  }

  getAlldata():Observable<any[]>{
    console.log("work");
    
    const uri = `${this.veiw}`;
    return this.http.get<any[]>(uri);

  }

  
  Postupdate(body){
    return this.http.post(`${this.update}`,body);
  }


  Postdelete(id){
    return this.http.post(`${this.delete}`+"/"+id,id);
  }


}
