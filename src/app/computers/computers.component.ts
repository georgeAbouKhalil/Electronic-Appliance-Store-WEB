import { CartItem } from './../cart.service';
import { Product } from './../api.service';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '../notify.service';


@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.css']
})
export class ComputersComponent implements OnInit {
  productID: any;
  cartID: any;
  @Input() product: Product;
  productToAdd: Product;
  error: string = '';
  cart: any;
  cartItemID: any;

  productPC: Product[] = [];

  imgUrlLogo: String = "https://i.imagesup.co/images2/37f486b8efd141540617ee12b45db3f23db3b261.png"

  constructor(private notify: NotifyService, public cartService: CartService, private auth: AuthService, private apiService: ApiService) {
  }


  ngOnInit(): void {
    this.getProduct();
    this.cart = JSON.parse(localStorage.getItem("cart"));
    console.log(this.cart);
  }


  getProduct() {
    console.log(this.apiService.getProductPc().subscribe(res => {
      this.productPC = res;
      console.log(this.productPC)
    }))
  };

  inc(computer) {
    if (computer.qnt != 5)
      computer.qnt += 1;
  }
  dec(computer) {
    if (computer.qnt != 1)
      computer.qnt -= 1
  }

  itemsCart: any = [];

  addCart(product) {

    this.productPC.filter((a: any) => {
      // console.log({a});
      // console.log(a.prodId);
      // console.log(product.prodId);
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

        ifInCart = true;

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

        console.log(this.cartService.cartItems);

        //search the product in the cart
        let oldProduct = this.cartService.cartItems.find(
          (productCart) =>
            productCart.prodId === product.prodId
        );

        console.log({ oldProduct });

        this.cartService.total -= oldProduct.price;

        if (productToUpdate.qnt != oldProduct.qnt) {
          this.cartService.updateCart(oldProduct.id, productToUpdate).subscribe(
            (newProductInCart) => {
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



    })

  }


}

