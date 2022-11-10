import { ApiService } from 'src/app/api.service';
import { DialogComponent } from './../dialog/dialog.component';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User, UsersService } from '../users.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Cart, CartService } from '../cart.service';
import { map, filter } from 'rxjs/operators'
import { MatDialog } from '@angular/material/dialog';
import { NotifyService } from '../notify.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users = []
  loginForm2: FormGroup;
  newcart: Cart;
  error: string = '';
  userID: any;
  carts = [];
  cart: any;
  user: User;
  constructor(private notify: NotifyService,private apiService: ApiService, public cartService: CartService, private userService: UsersService, private router: Router, private formBuilder: FormBuilder) {

  }
  ngOnInit(): void {
    this.users = this.userService.getUsers();
    this.loginForm2 = this.formBuilder.group({
      email: [''],
      password: [''],
    })

  }
  login() {
    this.apiService.getUserById(this.loginForm2.value.email, this.loginForm2.value.password).subscribe( 
      res => {
        console.log(res);
        
        this.user = res[0]
      console.log(this.user);
      
      if (this.user) {
      
        console.log(this.user);
        
        this.notify.success("Login Success");

        this.loginForm2.reset();
        this.userService.user = this.user; 

        localStorage.setItem("user", JSON.stringify(this.user));
        console.log(this.user.id);

        this.cartService.getCartByUserId(this.user.id).subscribe((cart) => {console.log({cart});
        
          this.cart = cart[0];
          console.log(this.cart);

          if (!this.cart) {
            
            this.createNewCart();
            this.getCart();
          }
          else {

           
            localStorage.setItem("cart", JSON.stringify(this.cart));
          }

        })

        this.router.navigate(['/home'])
        
      } else {
        
        this.notify.error("user not found");

      }
    }, err => {
     
      this.notify.error("something went wrong");

    })



  }
  public getCart(): void {
    
      this.cartService.getCartByUserId(this.user.id).subscribe(
        (cart) => {
        this.cartService.cart = cart;
        JSON.parse(localStorage.getItem("cart"));
      },
      (serverErrorResponse) => {
        this.error = serverErrorResponse.error.error;
      }
    );
  }


  public createNewCart(): void {
    console.log(this.user.id);
    
    this.userID = this.userService.user.id;
    this.userID = this.user.id;
    this.newcart = new Cart(this.userID, "open");
    this.cartService.createCart(this.newcart).subscribe(
      (cart) => {
        this.cartService.cart = cart,
          localStorage.setItem("cart", JSON.stringify(cart));
      },

      (serverErrorResponse) => {
        this.error = serverErrorResponse.error.error;
      }
    );
  }


}
