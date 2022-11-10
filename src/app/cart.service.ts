import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { find } from 'rxjs/operators';
import { Product } from './api.service';
import { User, UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart;
  total: number;
  cartItems: Product[];
  carts = [];

  baseURL: string = 'http://localhost:3000/';
  headers = { 'content-type': 'application/json' };
  @Input() user: User;

  constructor(private http: HttpClient, private userService: UsersService) {
    this.total = 0;
    this.cartItems = [];
  }

  createCart(newcart: Cart): Observable<any> {
    return this.http.post(this.baseURL + 'carts', newcart);
  }

  addToCart(orderItem: any): Observable<any> {
    return this.http.post(this.baseURL + 'cartItem', orderItem);
  }


  getCartByUserId(userId): Observable<any> {
    return this.http.get(this.baseURL + 'carts?userId=' + userId);
  }

  getCartItemsByCartId(id): Observable<any> {
    return this.http.get(this.baseURL + 'cartItem?cartId=' + id);
  }


  getCartId(cart): Observable<any> {
    return this.http.get(this.baseURL + 'carts/' + cart.id);
  }



  getCart(): Observable<any> {
    return this.http.get(this.baseURL + 'carts');
  }


  getCartItem(): Observable<any> {
    return this.http.get(this.baseURL + 'cartItem');
  }


  updateCart(itemId:any, updateItem: any): Observable<any> {
    return this.http.put(this.baseURL + 'cartItem/'+itemId, updateItem);
  }

  emptyCart(): Observable<any> {
    return this.http.delete(this.baseURL + 'cartItem');
  }

  deleteFromCart(product: any): Observable<any> {
    return this.http.delete(this.baseURL + 'cartItem/' + product.id);
  }


  init(): void {
    this.cartItems = [];
    this.total = 0;
  }

}

export class Cart {
  id: number;
  userId: Number;
  status: String;

  constructor(userId: Number, status = "open") {
    this.userId = userId;
    this.status = status;
  }
}

export class CartItem {
  id: number;
  cartId: Number;
  prodId: Number;
  Description: String;
  price: Number;
  qnt: Number;
  totalPrice: Number;

  constructor(cartId: Number, prodId: Number, Description: String, price: Number, qnt: Number, totalPrice: Number) {
    this.cartId = cartId;
    this.prodId = prodId;
    this.Description = Description;
    this.price = price;
    this.qnt = qnt;
    this.totalPrice = totalPrice;
  }
}