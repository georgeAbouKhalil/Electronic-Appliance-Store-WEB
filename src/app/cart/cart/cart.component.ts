import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Cart, CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  error: string = '';
  cart: any;
  newcart: any;
  interval: any;
  constructor(public cartService: CartService, public productsService: ApiService,) { }

  ngOnInit(): void {
    this.cart = JSON.parse(localStorage.getItem("cart"));
    this.getCartItems();
  }





  getCartItems(): void {

    this.cartService.getCartItemsByCartId(this.cart.id).subscribe(
      (cartItems) => {
        console.log({ cartItems });

        this.cartService.cartItems = cartItems
        console.log(this.cartService.cartItems);

        this.cartService.total = this.cartService.cartItems.map(product => (product.price * product.qnt)).reduce((a, b) => a + b);
        console.log(this.cartService.total);

      }
    );
  }





  incQnt(prodId, qnt) {
    for (let i = 0; i < this.cartService.cartItems.length; i++) {
      if (this.cartService.cartItems[i].prodId === prodId) {
        if (qnt != 5)
          this.cartService.cartItems[i].qnt = parseInt(qnt) + 1;
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.cartService.cartItems))

  }
  decQnt(prodId, qnt) {
    for (let i = 0; i < this.cartService.cartItems.length; i++) {
      if (this.cartService.cartItems[i].prodId === prodId) {
        if (qnt != 1)
          this.cartService.cartItems[i].qnt = parseInt(qnt) - 1;
      }
    }


  }
  openSmallWindows() {
    window.open("https://www.paypal.com/checkoutnow?locale.x=en_GB&fundingSource=paypal&sessionID=uid_8d0905abde_mty6mzg6nda&buttonSessionID=uid_99229cc01b_mty6mzg6nda&env=production&fundingOffered=paypal&logLevel=warn&sdkMeta=eyJ1cmwiOiJodHRwczovL3d3dy5wYXlwYWxvYmplY3RzLmNvbS9hcGkvY2hlY2tvdXQuanMifQ&uid=31430364a6&version=4&token=EC-10V29349SA340831D&xcomponent=1", "", "width=500, height=650");
  }
}