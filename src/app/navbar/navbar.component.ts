import { LoginComponent } from './../login/login.component';
import { Cart, CartService } from 'src/app/cart.service';
import { RouterLink } from '@angular/router';
import { Component, Input, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators'
import { UsersService } from '../users.service';
import { NotifyService } from '../notify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartItem: any;
  error: string = '';
  countItem: number = 0;
  // cart: any;
  user: any;
  carts = [];
  items = [];
  userCart: Cart;
  userId = null;
  interval: any;

  @Input() cart: Cart;
  constructor(private notify: NotifyService,private auth: AuthService, public cartService: CartService, private http: HttpClient, private userService: UsersService) {

  }


  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('user'))) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.userId = this.user.id;
    } else {
      this.userId = this.userService.user?.id;

    }

    // console.log(this.cart);

    this.startTimer();

  }





  myImage: String = "assets/images/logoRemove.png"

  getCartItemCount() {

    // console.log(this.userId);

    this.cartService.getCartByUserId(this.userId).subscribe((cart) => {
      this.cart = cart[0];
      // console.log({ cart });
      // console.log(this.cart);
      // console.log(this.cart.id);
      this.cartService.getCartItemsByCartId(this.cart.id).subscribe(
        (cartItems) => {
          // console.log({ cartItems });
          this.items = cartItems;

          // console.log(this.items.length);

          if (this.items.length > 0) {
            // map to get just the quantity and then sum with reduce
            this.countItem = this.items.map(a => a.qnt).reduce((a, b) => a + b);
            // console.log(this.countItem);

          }
          else if (this.items.length = 0) {
            this.countItem = 0;
          }
        });
    })
    //     });
    // });
  }




  startTimer() {
    this.interval = setInterval(() => {
      this.getCartItemCount();
    }, 2000)
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  logout() {
    this.notify.success("Logout Success");
    localStorage.removeItem("user");
    localStorage.removeItem("cart")
    this.cartService.init();
    this.cart = null;
    this.items = [];
    this.countItem = 0;

  }
}
