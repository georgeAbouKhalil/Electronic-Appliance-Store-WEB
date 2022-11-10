import { Component, OnInit } from '@angular/core';
import { ApiService, Product } from '../api.service';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { NotifyService } from '../notify.service';

@Component({
  selector: 'app-monitors',
  templateUrl: './monitors.component.html',
  styleUrls: ['./monitors.component.css']
})
export class MonitorsComponent implements OnInit {
  imgUrlLogo: String = "https://i.imagesup.co/images2/37f486b8efd141540617ee12b45db3f23db3b261.png"
  productMonitor: any[] = [];
  cart: any;
  productToAdd: Product;
  error: string = '';
  
  constructor(private notify: NotifyService,private auth: AuthService, private apiService: ApiService, public cartService: CartService) { }

  getProduct() {
    console.log(this.apiService.getProductMonitor().subscribe(res => {
      this.productMonitor = res;
      console.log(this.productMonitor)
    }))
  };
  ngOnInit(): void {
    this.getProduct();
    this.cart = JSON.parse(localStorage.getItem("cart"));

  }

  inc(monitor) {
    if (monitor.qnt != 5)
      monitor.qnt += 1;
  }
  dec(monitor) {
    if (monitor.qnt != 1)
      monitor.qnt -= 1
  }
  itemsCart: any = []
  // addCart(category){
  //   let cartDataNull = localStorage.getItem('localCart');
  //   if(cartDataNull == null){
  //     let storeDataGet:any = [];
  //     storeDataGet.push(category);
  //     localStorage.setItem('localCart',JSON.stringify(storeDataGet))
  //   }
  //   else{
  //     var id = category.prodId;
  //     let index:number = -1;
  //     this.itemsCart = JSON.parse(localStorage.getItem('localCart'));
  //     for(let i=0; i<this.itemsCart.length; i++){
  //       if(parseInt(id) === parseInt(this.itemsCart[i].prodId)){
  //         this.itemsCart[i].qnt = category;
  //         index = i;
  //         break;
  //       }
  //     }
  //     if(index == -1){
  //       this.itemsCart.push(category);
  //       localStorage.setItem('localCart',JSON.stringify(this.itemsCart))
  //     }
  //     else{
  //       localStorage.setItem('localCart',JSON.stringify(this.itemsCart))
  //     }
  //   }
  //   this.cartNumberFunc();
  // }

  addCart(product) {
    this.productMonitor.filter((a: any) => {
      return a.prodId === product.prodId;
    });

    //If product already in cart
    let ifInCart = false;   // not in the cart

    // Get PRODUCTS FROM CART
    this.cartService.getCartItemsByCartId(this.cart.id).subscribe(res => {
      this.cartService.cartItems = res;
      console.log(this.cartService.cartItems)

      // some return true/false - if product is in cart
      if (
        this.cartService.cartItems.some((item) =>
          item.prodId === product.prodId
        )
      ) {

        //product is in cart
        // alert("yes")
        //change ifInCart to true that is in cart
        ifInCart = true;

        // //search the product in the cart
        // let oldProduct = this.cartService.cartItems.find(
        //   (productCart) =>
        //     productCart.prodId === product.prodId
        // );

        // console.log({ oldProduct });

        // this.cartService.total -= oldProduct.price;
      }

      // IF PRODUT NOT IN CART
      if (!ifInCart) {
        // alert("no"); 
        console.log({ product });
        //product is the product received in function
        let productToAdd = {
          cartId: this.cart.id,
          prodId: product.prodId,
          Description: product.Description,
          imgUrl: product.imgUrl,
          price: product.price,
          qnt: product.qnt,
          totalPrice: product.qnt * product.price,
        };
        console.log({ productToAdd });

        this.cartService.addToCart(productToAdd).subscribe(
          (newProductInCart) => {
            this.notify.success("add successfully")
            //Get updated cart items  getCartItemsByCartId(this.cart.id)
            // this.cartService.getCartItem().subscribe(
              this.cartService.getCartItemsByCartId(this.cart.id).subscribe(
                (cartItems) => {
                this.cartService.cartItems = cartItems;
                this.cartService.total += newProductInCart.totalPrice;
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
      //IF PRODUCT IS IN CART
      else if (ifInCart) {
        // alert("oui");
        let productToUpdate = {
          cartId: this.cart.id,
          prodId: product.prodId,
          Description: product.Description,
          imgUrl: product.imgUrl,
          price: product.price,
          qnt: product.qnt,
          totalPrice: product.qnt * product.price,
        };
        console.log({ productToUpdate });

        //search the product in the cart
        let oldProduct = this.cartService.cartItems.find(
          (productCart) =>
            productCart.prodId === product.prodId
        );

        console.log({ oldProduct });

        this.cartService.total -= oldProduct.price;

        if(productToUpdate.qnt != oldProduct.qnt){

        this.cartService.updateCart(oldProduct.id, productToUpdate).subscribe(
          (newProductInCart) => {
            this.notify.success("updated successfully")

            //Get updated cart items   
            // this.cartService.getCartItem().subscribe(
              this.cartService.getCartItemsByCartId(this.cart.id).subscribe(
                (cartItems) => {
                this.cartService.cartItems = cartItems;
                this.cartService.total += newProductInCart.totalPrice;
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
      }
      // }


    })//............

  }

  // cartNumber: number = 0
  // cartNumberFunc() {
  //   var cartValue = JSON.parse(localStorage.getItem('localCart'));
  //   this.cartNumber = cartValue.length;
  //   this.auth.cartSubject.next(this.cartNumber)
  // }
}
