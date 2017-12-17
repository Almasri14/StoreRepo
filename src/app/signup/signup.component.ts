import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoginService} from '../login/login.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }
  OnSignUp(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const status = form.value.gender;
    console.log(status);
    if (password !== '' && email !== '') {
     this.loginService.signUpUser(email , password , status);
    }
    if (email !== '' && password === '') {
      alert('Enter password please');
    }
    if (password !== '' && email === '') {
      alert('Enter email please');
    }
    if (password === '' && email === '') {
      alert('Enter email and password please');
    }
  }
}
