import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
   formLogin! : FormGroup;

   constructor(private fb : FormBuilder,
               private route : Router) {
   }
  ngOnInit() {
     this.formLogin=this.fb.group({
       username : this.fb.control(""),
       password : this.fb.control("")
     });
  }

  handleLogin() {
    console.log(this.formLogin.value);
    if (this.formLogin.value.username=="admin" && this.formLogin.value.password=="1234"){
      this.route.navigateByUrl('/admin');
    }
  }
}
