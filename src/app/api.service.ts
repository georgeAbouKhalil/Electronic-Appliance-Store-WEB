import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  products: Product[] = [];

baseURL: string = 'http://localhost:3000/';
headers = { 'content-type': 'application/json' };

  constructor(private http: HttpClient) {}
  getProduct(): Observable<any> {
    return this.http.get(this.baseURL + 'products');
    }
  getProductPc(): Observable<any> {
    return this.http.get(this.baseURL + 'products?category=pc');
    }
  getProductMonitor(): Observable<any> {
    return this.http.get(this.baseURL + 'products?category=monitor');
    }
  getProductTablet(): Observable<any> {
    return this.http.get(this.baseURL + 'products?category=tablet');
    }
  updateProduct(product: Product): Observable<any> {
    let body = JSON.stringify(product);
    return this.http.put(this.baseURL + 'products/' + product.prodId, body,
    {headers: this.headers});
  }
    
    
getUserById(email:string, password:string): Observable<any> {
  console.log(this.baseURL + 'registered?email=' + email+'&password='+password);
  
  return this.http.get(this.baseURL + 'registered?email=' + email +'&password='+password);
}
}
export class Product {
  id:number;
  Description:String;
  imgUrl:String;
  price:number;
  qnt:number;
  prodId:Number;
  name:String;
  category:String;

  constructor( Description:String,imgUrl:String,price:number,qnt:number,prodId:Number,name:String,category:String){
    this.Description = Description;
    this.imgUrl = imgUrl;
    this.price = price;
    this.qnt = qnt;
    this.prodId = prodId;
    this.name = name;
    this.category = category;
  }
}
