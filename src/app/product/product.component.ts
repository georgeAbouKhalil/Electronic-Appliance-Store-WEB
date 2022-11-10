import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ComputersComponent } from '../computers/computers.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewInit {
  @Input() selectedCategory: String;
  @ViewChild(SidebarComponent) sidebar?: SidebarComponent;
  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.cd.detectChanges();
  }

}
