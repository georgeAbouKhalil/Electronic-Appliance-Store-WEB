import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productsPC: any[] = [];
  productsMonitor: any[] = [];
  productsTablet: any[] = [];
  productID: any;
  currentProduct: any;

  constructor(private actRoute: ActivatedRoute, private apiService: ApiService) {
    this.productID = this.actRoute.snapshot.params["prodId"];
  }
  ngOnInit(): void {
    this.getProductPC()
    this.getProductMonitor()
    this.getProductTablet()
  }
  getProductPC() {
    this.apiService.getProductPc().subscribe(res => {
      this.productsPC = res;

      for (let product of this.productsPC) {
        console.log(this.productsPC);
        console.log(product.prodId);
        console.log(this.productID);
        if (product.prodId == this.productID) {
          this.currentProduct = product;
        } console.log(this.currentProduct);
      }
    });
  }

  getProductMonitor() {
    this.apiService.getProductMonitor().subscribe(res => {
      this.productsMonitor = res;

      for (let product of this.productsMonitor) {
        console.log(this.productsMonitor);
        console.log(product.prodId);
        console.log(this.productID);
        if (product.prodId == this.productID) {
          this.currentProduct = product;
        } console.log(this.currentProduct);
      }
    });
  }

  getProductTablet() {
    this.apiService.getProductTablet().subscribe(res => {
      this.productsTablet = res;

      for (let product of this.productsTablet) {
        console.log(this.productsTablet);
        console.log(product.prodId);
        console.log(this.productID);
        if (product.prodId == this.productID) {
          this.currentProduct = product;
        } console.log(this.currentProduct);
      }
    });
  }


}

