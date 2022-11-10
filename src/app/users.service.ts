import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  user = new User("","","","","","","");
  savedUserName:String=""
  savedEmal:String=""
  savedaddress:String=""
  savedimgUrl:String=""
  savedphone:String=""
  savedName:String=""
getUsers(){
  return [
    new User('georgeak','georgeak@gmail.com','george123','5199-5181 Donatello St Miami','https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTgwNDYwMDg1ODI5NDQ1NDg0/gettyimages-969403912.jpg','+1 542 54853', 'George Abou Khalil'),
    new User('samehbesan','samehbes@gmail.com','samehwe2314','4800-4998 NE 30th Ave alberta','https://pbs.twimg.com/media/Cl-PwlTWgAM1N4f.jpg', '+1 252 51545', 'Sameh Besan'),
  ]
}


discountsProduct:any = [
  {Description:"T5-26AMR Tower 90RC008SYS" , imgUrl:"https://www.computerlounge.co.nz/data/media/images/catalogue/Products2/Systems/Ready%20to%20Ship/34765_1.jpg?maxheight=950&maxwidth=600&quality=100&404=default.jpg" ,oldPrice:1800, price: 1620, qnt:1, prodId:31,name:"Lenovo",category:"pc",Discounts:-10},
  {Description:"Lenovo Legion T5-26AMR Tower 90RC008TYS" , imgUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTdoi_Ctiq_eFMuXLmiSJfKWTeWVfEjKAhQ&usqp=CAU",oldPrice:1900, price: 1615, qnt:1, prodId:32,name:"Lenovo",category:"pc",Discounts:-15},
  {Description:"Rayzer 4xGreen rtx" , imgUrl:"https://d1k3jiaf8cocae.cloudfront.net/wp-content/uploads/r2-2.jpg", oldPrice:2200, price: 1870, qnt:1, prodId:33,name:"Rayzer",category:"pc",Discounts:-15},
  {Description:"Lenovo Legion T5-26AMR Tower 90RC008SYS" , imgUrl:"https://ksp.co.il/shop/items/150521.jpg", oldPrice:8570, price: 6427, qnt:1, prodId:34, name:"Lenovo",category:"pc",Discounts:-25},
  {Description:"Lenovo Legion T7-34IMZ Tower 90Q90012YS" , imgUrl:"https://www.punchtechnology.co.uk/wp-content/uploads/2020/10/Gamemax-Comando-White-ARGB-mATX-Case.jpg", oldPrice:9999, price: 7499, qnt:1, prodId:35, name:"Lenovo",category:"pc",Discounts:-25},
  {Description:"Antec S4567" , imgUrl:"data:image/jpeg;base64,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", oldPrice:2481, price: 1860, qnt:1, prodId:36, name:"antec",category:"pc",Discounts:-20},
  {Description:"Lenovo IdeaCenter G5 14IMB05 i7-10700 / 32G /" , imgUrl:"https://cdn.alzashop.com/ImgW.ashx?fd=f16&cd=sklBTI3080", oldPrice:9999, price: 7499, qnt:1, prodId:37, name:"Rayzer",category:"pc",Discounts:-25},
  {Description:"antec nx600" , imgUrl:"https://cdn.alzashop.com/ImgW.ashx?fd=f16&cd=sklRB4c9g5w", oldPrice:9999, price: 7499, qnt:1, prodId:38, name:"antec",category:"pc",Discounts:-25},
]
newProduct:any = [
  {Description:"Acer Nitro 50 Gaming Desktop Computer" , imgUrl:"https://static.bhphoto.com/images/images500x500/acer_dg_e26aa_001_n50_610_ur14_nitro_50_series_1593106610_1571697.jpg" , price: 1620, qnt:1, prodId:39,name:"T5-26AMR",category:"pc"},
  {Description:"Lenovo IdeaCenter G5 14IMB05 i7" , imgUrl:"https://tms.co.il/image/cache/catalog/products/90nr000fys/wGUBoTzFCu-450x450.jpg", price: 515, qnt:1, prodId:40,name:"Lenovo",category:"pc"},
  {Description:"Lenovo IdeaPad 5 15.6' i5-1035G1 / 8G / 512GB" , imgUrl:"https://tms.co.il/image/cache/catalog/products/82h800cyiv/vxTQzFUiuv-450x450.jpg",  price: 1870, qnt:1, prodId:41,name:"Rayzer",category:"pc"},
  {Description:"Lenovo Ideapad 3 15.6' i3-1115G4 / 8G " , imgUrl:"https://tms.co.il/image/cache/catalog/products/p1440fa-fq2636/mvdwn2q7mA-450x450.jpg", price: 3625, qnt:1, prodId:42, name:"Lenovo ",category:"pc"},
  {Description:"Asus P1440 14' i3-10110U / 8G" , imgUrl:"https://tms.co.il/image/cache/catalog/products/ux425ea-bm048/lKbDovg010-450x450.jpg", price: 2536, qnt:1, prodId:43, name:"Lenovo ",category:"pc"},
  {Description:"Asus UX425EA 14' i5-1135G7 / 8G" , imgUrl:"https://tms.co.il/image/cache/catalog/products/81yk00tmiv/MTJcCX8VVn-450x450.jpg", price: 1952, qnt:1, prodId:44, name:"Antec",category:"pc",Discounts:-20},
  {Description:"Gigabyte G7 17.3' i7-10870H / 16G" , imgUrl:"https://tms.co.il/image/cache/catalog/products/g7-kc-8ee1130sh/dwKH4MXLFD-450x450.png", price: 1253, qnt:1, prodId:45, name:"Lenovo",category:"pc",Discounts:-25},
  {Description:"Razer Blade Ultrabook 12.5' Touch I7-6500U / 8G /" , imgUrl:"https://tms.co.il/image/cache/catalog/products/qf9-00305-ci/TRXSL5TNMS-450x450.jpg", price: 452, qnt:1, prodId:46, name:"Antec",category:"pc",Discounts:-25},
]

  constructor() {}
}

export class User {
  id: Number;
  userName:string;
  email:String;
  password:String;
  address:String;
  imgUrl:String;
  Phone:String;
  name:String;
  fullName: String;

  constructor(userName:string,email: String, password: String, address: String, imgUrl:String, Phone:String, name:String){
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.address = address;
    this.imgUrl = imgUrl;
    this.Phone = Phone;
    this.name = name;
  }
  savedUserName(){
    return this.userName
  }
  savedEmal(){
    return this.email
  }
  savedaddress(){
    return this.address
  }
  savedimgUrl(){
    return this.imgUrl
  }
  savedphone(){
    return this.Phone
  }
  savedname(){
    return this.name
  }


}