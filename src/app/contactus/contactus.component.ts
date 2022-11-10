import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  
  constructor() { 
  }

  ngOnInit(): void {
  }
  email2:String="samehbes@gmail.com"
  email1:String='Georgeak@gmail.com'
  profession:String="Software Developer"
  name1:String="George ak"
  name2:String="sameh besan"
  id1:String="3215446587"
  id2:String="3589487512"
}
