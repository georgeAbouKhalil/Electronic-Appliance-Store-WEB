import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApiService ,Product} from '../api.service';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  product = new Product("","",0,0,0,"","");
  
  constructor(private http: HttpClient, private apiService: ApiService) { }

  ngOnInit(): void {
  }
  products2:any = this.apiService.getProduct()
  products:any = [
    {name:'pc & laptop'},
    {name:'monitors'},
    {name:'tablets'},
  ]
  selectedCategory:String='null';
  showpc(){
    this.selectedCategory = "pc"
  }
  showmonitors(){
    this.selectedCategory = "monitors"
  }
  showtablets(){
    this.selectedCategory = "tablets"
  }
}
