import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private userService: UsersService) {}
  userName:String=""
  email:String=""
  address:String=""
  imgUrl:String=""
  phone:String=""
  name:String=""
  ngOnInit(): void {
    this.userName = this.userService.user.userName
    this.email = this.userService.user.email
    this.address = this.userService.user.address
    this.imgUrl = this.userService.user.imgUrl
    this.phone = this.userService.user.Phone
    this.name = this.userService.user.fullName
  }
}
