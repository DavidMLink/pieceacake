import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { compareValidator } from '../directives/compare-validator.directive';
import { UserService } from '../user.service';
import { map, filter, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.createForm();

    this.loginForm = this.fb.group({
      email: [
      '',
      [Validators.required, Validators.email] // sync validator
       // async validator
      ],
      password: ['', Validators.required]
    });  

    this.loginForm.get('email').valueChanges.subscribe(
      value => console.log(value) //handleValidations()
    )
    this.loginForm.get('password').valueChanges.subscribe(
      value => console.log(value)
    )
  }
  
  createForm() {
  }
  
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
    
    onSubmit(){
      console.log("EXECUTED onSUBMIT FUNCTION!");
      console.log(this.loginForm.value);
      console.log(this.loginForm.value);
      console.log(this.loginForm.value);
      console.log(this.loginForm.value);
      let observable = this.userService.loginUser(this.loginForm.value) //SENDING JSON like dictionary
      observable.subscribe(
        response => {
          console.log("Response:", response);
          // localStorage.setItem('token', response['token'])
          // console.log('token', response['token']);
          if (response){
            this.router.navigate(['/dashboard']);
          }
        },
        error => {
          console.log('error', error);
        }
      );
    }

}
