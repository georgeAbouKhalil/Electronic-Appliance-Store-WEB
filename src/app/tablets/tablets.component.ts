import { Component, OnInit } from '@angular/core';
import { ApiService, Product } from '../api.service';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { NotifyService } from '../notify.service';

@Component({
  selector: 'app-tablets',
  templateUrl: './tablets.component.html',
  styleUrls: ['./tablets.component.css']
})
export class TabletsComponent implements OnInit {
  productTablet: any[] = [];
  productToAdd: Product;
  error: string = '';
  cart: any;

  constructor(private notify: NotifyService, private auth: AuthService, private apiService: ApiService, public cartService: CartService) { }
  imgUrlLogo: String = "https://i.imagesup.co/images2/37f486b8efd141540617ee12b45db3f23db3b261.png"
  getProduct() {
    console.log(this.apiService.getProductTablet().subscribe(res => {
      this.productTablet = res;
      console.log(this.productTablet)
    }))
  };

  ngOnInit(): void {
    this.getProduct();
    this.cart = JSON.parse(localStorage.getItem("cart"));
  }

  inc(tablet) {
    if (tablet.qnt != 5)
      tablet.qnt += 1;
  }
  dec(tablet) {
    if (tablet.qnt != 1)
      tablet.qnt -= 1
  }

  itemsCart: any = []

  addCart(product) {
    this.productTablet.filter((a: any) => {
      return a.prodId === product.prodId;
    });

    //If product already in cart
    let ifInCart = false;   // not in the cart

    // Get PRODUCTS FROM CART
    this.cartService.getCartItem().subscribe(res => {
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

        // // console.log({ oldProduct });

        // this.cartService.total -= oldProduct.price;
      }

      // IF PRODUT NOT IN CART
      if (!ifInCart) {
        // alert("no"); 
        // console.log({ product });
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
        // console.log({ productToAdd });

        this.cartService.addToCart(productToAdd).subscribe(
          (newProductInCart) => {
            this.notify.success("add successfully")
            //Get updated cart items
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
        // console.log({ productToUpdate });
        console.log(this.cartService.cartItems);

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
            console.log({newProductInCart});
            this.notify.success("updated successfully")
            //Get updated cart items
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

    })//............

  }

}
