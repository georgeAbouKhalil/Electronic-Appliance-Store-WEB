import { ApiService } from './../../api.service';
import { Cart, CartService } from 'src/app/cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/api.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() product: Product;
  @Input() cart: Cart;

  error: string = '';
  maxAmount: number;
  minAmount: number;
  items =[];
  constructor(public cartService: CartService, public productsService: ApiService,) { }

  ngOnInit(): void {
// console.log(this.cartService.cartItems);
    this.cart = JSON.parse(localStorage.getItem("cart"));
    this.maxAmount = 99;
    this.minAmount = 1;
}


incQnt(product){
  if(product.qnt != 5){
  if (product.qnt <= this.maxAmount) {
    product.qnt++;
  }

  this.cartService.getCartItemsByCartId(this.cart.id).subscribe(
    (cartItems) => {
      this.cartService.cartItems = cartItems;
      console.log(this.cartService.total);
      this.cartService.total =  this.cartService.cartItems.map(product => (product.price* product.qnt)).reduce((a,b)=> a+b); 
    },
    );
  }
    this.updateCart(product);
}

decQnt(product){

  if (product.qnt >= this.minAmount) {
    product.qnt--;
  }
  this.cartService.getCartItemsByCartId(this.cart.id).subscribe(
    (cartItems) => {
      this.cartService.cartItems = cartItems;
      this.cartService.total=  this.cartService.cartItems.map(product => (product.price* product.qnt)).reduce((a,b)=> a+b); 
    },
    );
  console.log(product);
  this.updateCart(product);


  }
  
updateCart(product){
  this.cartService.updateCart(product.id, product).subscribe(
    (newProductInCart) => {
      //Get updated cart items
      this.cartService.getCartItemsByCartId(this.cart.id).subscribe(
        (cartItems) => {
          this.cartService.cartItems = cartItems;
          this.cartService.total=  this.cartService.cartItems.map(product => (product.price* product.qnt)).reduce((a,b)=> a+b); 

        },
        (serverErrorResponse) => {
          this.error = serverErrorResponse.error.error;
        }
      );
    },
    (serverErrorResponse) => {
      this.error = serverErrorResponse.error.error;
    }
  );
  }

   removeFromCart(product: Product) {
    console.log({product});
    
    this.cartService.deleteFromCart(product).subscribe(
      () => {

        this.cartService.getCartItemsByCartId(this.cart.id).subscribe(
          (cartItems) => {
            console.log({cartItems});

            this.cartService.cartItems = cartItems;
            console.log(this.cartService.total);
            console.log(product.price);
            this.cartService.total = this.cartService.total - (product.price* product.qnt);
          },
          (serverErrorResponse) => { this.error = serverErrorResponse.error.error; }
        );
      },
      (serverErrorResponse) => { this.error = serverErrorResponse.error.error; }
    );
  }

  openSmallWindows(){
    window.open("https://www.paypal.com/checkoutnow?locale.x=en_GB&fundingSource=paypal&sessionID=b043e20bc0_mtq6mtm6mde&buttonSessionID=e013f98622_mtq6mtq6mjy&env=production&fundingOffered=paypal&logLevel=warn&sdkMeta=eyJ1cmwiOiJodHRwczovL3d3dy5wYXlwYWxvYmplY3RzLmNvbS9hcGkvY2hlY2tvdXQuanMifQ&uid=8391878fef&version=4&token=EC-4M0592542F665093F&xcomponent=1", "", "width=500, height=650");
    }
    
}
