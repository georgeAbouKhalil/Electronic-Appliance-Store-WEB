import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {
  @Input() selectedCategory:String
  constructor() { }

  ngOnInit(): void {
  }

}
