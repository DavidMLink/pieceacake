import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { compareValidator } from '../directives/compare-validator.directive';
import { UserService } from '../user.service'; 
import { map, filter, switchMap } from 'rxjs/operators';
import { ValidateEmailNotTaken } from '../validators/async-email.validator';
import { Router } from '@angular/router'
// import { uniqueEmailValidator } from '../directives/unique-email-validator.directive';
// import { uniqueUsernameValidator } from '../directives/unique-username-validator.directive';

// function validateEmailNotTaken(control: AbstractControl) {
//   return this.signupService.checkEmailNotTaken(control.value).map(res => {
//     return res ? null : { emailTaken: true };
//   });
// }
// function validateEmailNotTaken(values: {}): ValidatorFn{
//   return (control: AbstractControl): {[key: string]: boolean} | null => {
//     if (this.userService.checkEmailNotTaken(values)){
//       return {'uniqueEmail': true};
//     }
//     return null;
//   }
// }

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css','../app.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.createForm();

    this.registrationForm = this.fb.group({
      email: [
      '',
      [Validators.required, Validators.email], // sync validator
      ValidateEmailNotTaken.createValidator(this.userService) // async validator
      ],
      password: ['', Validators.required],
      passwordConfirm: ['', [Validators.required, compareValidator('password')]]
    });  

    this.registrationForm.get('email').valueChanges.subscribe(
      value => console.log(value) //handleValidations()
    )
    this.registrationForm.get('password').valueChanges.subscribe(
      value => console.log(value)
    )
    this.registrationForm.get('passwordConfirm').valueChanges.subscribe(
      value => console.log(value)
    )
  }
  
  createForm() {
  }
  
  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get pwConfirm() {
    return this.registrationForm.get('passwordConfirm');
  }
    
    onSubmit(){
      console.log("EXECUTED onSUBMIT FUNCTION!");
      let observable = this.userService.createUser(this.registrationForm.value)
      observable.subscribe(
        response => {
          console.log("Response", response);
          if(response){
            this.router.navigate(['/dashboard']);

          }

        },
        error => {
          console.log("Error!", error);
        })
      }
      
}
    
    // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
    // Validators.minLength(6),
    // Validators.maxLength(20)