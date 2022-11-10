import { Component, OnInit , Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../api.service';
import { AuthService } from '../auth.service';
import { Cart, CartService } from '../cart.service';
import { UsersService } from '../users.service';
import { NotifyService } from '../notify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName:String=""
  users:any =[]
  discountsProduct:any = []
  newProduct:any = []
  productname:any
  error: string = '';
  userID: any;
cartID: any;
  cart: any;
  productToAdd: Product;
  carto: any;
  comp:boolean=false;

  constructor(private notify: NotifyService,private actRoute: ActivatedRoute,public cartService: CartService, private userService: UsersService,private auth: AuthService) { }

  ngOnInit(): void {
    
    this.users = this.userService.getUsers()
    this.swapPicture();
    this.interval = setInterval(() => this.swapPicture(), 2500);
    this.discountsProduct = this.userService.discountsProduct
    this.newProduct = this.userService.newProduct;
    this.userName = this.userService.user?.userName;

this.comp =true;

  }
  public interval;
  imageSrc = '';
  public i = 0;
  imageButtons = [
    'https://cdn11.bigcommerce.com/s-tr29lmokh7/images/stencil/original/carousel/108/Banner_Design-1448_x_525.jpg?c=2',
    'https://www.discount-computer.com/product_images/uploaded_images/products-by-category-5.jpg?c=2',
    'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/154104426/original/ff9b9f68a8184bdb270445feff6c700f30792890/do-a-professional-gaming-pc-banner.jpg',
    "https://www.babacomputers.com/wp-content/uploads/2015/03/inner-desktop-banner.jpg",
    "https://apps-for-pc.com/wp-content/uploads/2020/09/Must-Have-Important-Software-For-Gaming-PC.jpg", 
  ];
  swapPicture() {
    this.imageSrc = this.imageButtons[this.i];
    if (this.i < this.imageButtons.length - 1) this.i++;
    else this.i = 0;
    // setTimeout('swapPicture()', 2500);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
  itemsCart:any =[]

  addCart(product) {


    this.cart = JSON.parse(localStorage.getItem("cart"));
    console.log(this.cart);


    this.discountsProduct.filter((a: any) => {
      return a.prodId === product.prodId;
    });

    //If product already in cart
    let ifInCart = false;   // not in the cart

     
    // Get PRODUCTS FROM CART
    // this.cartService.getCartItem().subscribe(res => {
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
        //change ifInCart to true that is in cart
        ifInCart = true;

      }
      // IF PRODUT NOT IN CART
      if (!ifInCart) {
      
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
        console.log({productToAdd});
        

        this.cartService.addToCart(productToAdd).subscribe(
          (newProductInCart) => {
            this.notify.success("add successfully")
            //Get updated cart items
              this.cartService.getCartItemsByCartId(this.cart.id).subscribe(
              (cartItems) => {
                console.log({cartItems});
                console.log(this.cartService.cartItems);
                console.log({newProductInCart});
                
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
        this.notify.error("you can get just 1 pc of this product")

      }
    })
  }
}