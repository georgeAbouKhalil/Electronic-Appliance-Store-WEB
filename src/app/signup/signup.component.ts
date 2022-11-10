import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { NotifyService } from '../notify.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private notify: NotifyService,private apiService: ApiService, private http: HttpClient, private router: Router) { }
  signupForm: FormGroup;
  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm(){
    this.signupForm = new FormGroup({
      email: new FormControl('',[Validators.required , Validators.email]),
      userName: new FormControl('', [Validators.required,Validators.minLength(5)]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)]),
      address: new FormControl('',[Validators.required]),
      Phone: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      imgUrl: new FormControl(),
      fullName: new FormControl('', [Validators.required, Validators.pattern('^[A-Z|a-z| ]+$')]),
    })
  }
  onSubmit(){
    console.log(this.signupForm.value);
    //checking email existence need to do this
    this.http.get<any>("http://localhost:3000/registered").subscribe(res=>{
      const user = res.find((a:any)=>{
        console.log({a});
        return a.email === this.signupForm.value.email || a.userName ===this.signupForm.value.userName
      });
      console.log({user});
      if(user){
        if(user.email === this.signupForm.value.email){
          this.notify.error("Duplicated email");
        }
        if(user.userName === this.signupForm.value.userName){
          this.notify.error("Duplicated user name");
        }
      }else
      if(!user){
        this.http.post<any>("http://localhost:3000/registered",this.signupForm.value).subscribe(res=>{
          this.notify.success("Signup Successfull");
      this.signupForm.reset();
      this.router.navigate(['login']);
    },err=>{
      this.notify.error("Something went wrong");
    })
  }
    })
    
  }
}
