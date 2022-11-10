import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.CartDetails();
    this.loadCart();
  }
  getCartDetails:any = []
  CartDetails(){
    if(localStorage.getItem('localCart')){
      this.getCartDetails =JSON.parse(localStorage.getItem('localCart'));
      console.log(this.getCartDetails);
    }
  }
  incQnt(prodId, qnt){
    for(let i=0; i<this.getCartDetails.length;i++){
      if(this.getCartDetails[i].prodId === prodId){
        if(qnt !=5)
        this.getCartDetails[i].qnt = parseInt(qnt) +1;
      }
    }
    localStorage.setItem('localCart',JSON.stringify(this.getCartDetails))
    this.loadCart();
  }
  decQnt(prodId, qnt){
    for(let i=0; i<this.getCartDetails.length;i++){
      if(this.getCartDetails[i].prodId === prodId){
        if(qnt !=1)
        this.getCartDetails[i].qnt = parseInt(qnt) -1;
      }
    }
    localStorage.setItem('localCart',JSON.stringify(this.getCartDetails))
    this.loadCart();
  }
  total:number = 0;
  loadCart(){
    if(localStorage.getItem('localCart')){
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart'))
      this.total = this.getCartDetails.reduce(function(acc, val) {
        return acc + (val.price * val.qnt);
      },0)
    }
  }
  singleDelete(getCartDetails){
    console.log(getCartDetails);
    if(localStorage.getItem('localCart')){
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart'))
      for(let i=0; i<this.getCartDetails.length; i++){
      if(this.getCartDetails[i].prodId === getCartDetails){
        this.getCartDetails.splice(i,1);
        localStorage.setItem('localCart',JSON.stringify(this.getCartDetails))
        this.loadCart();
      }
    }
  }
}

openSmallWindows(){
  window.open("https://www.paypal.com/checkoutnow?locale.x=en_GB&fundingSource=paypal&sessionID=b043e20bc0_mtq6mtm6mde&buttonSessionID=e013f98622_mtq6mtq6mjy&env=production&fundingOffered=paypal&logLevel=warn&sdkMeta=eyJ1cmwiOiJodHRwczovL3d3dy5wYXlwYWxvYmplY3RzLmNvbS9hcGkvY2hlY2tvdXQuanMifQ&uid=8391878fef&version=4&token=EC-4M0592542F665093F&xcomponent=1", "", "width=500, height=650");
  }
}
