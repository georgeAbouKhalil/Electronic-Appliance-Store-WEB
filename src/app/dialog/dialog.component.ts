import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
cart: any;
user:any;
  constructor(private matdialog: MatDialog) {
  }

  ngOnInit() {
   this.cart = JSON.parse(localStorage.getItem('cart'));    
   this.user=  JSON.parse(localStorage.getItem('user'));
  }

  closeDialog() {
    this.matdialog.closeAll();
  }

}
