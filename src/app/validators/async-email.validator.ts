import { AbstractControl } from '@angular/forms';
import { UserService } from '../user.service';
import { map, filter, switchMap } from 'rxjs/operators';

export class ValidateEmailNotTaken {
  static createValidator(userService: UserService) {
    return (control: AbstractControl) => {
      // console.log(control.value);
      return userService.checkEmailNotTaken(control.value).pipe(map(res => {
        return res ? null : { emailTaken: true };
      }));
    };
  }
}


// export class ValidateEmailNotTaken {
//   static createValidator(userService: UserService) {
//     return (control: AbstractControl) => {
//       return userService.checkEmailNotTaken(control.value).pipe(map(res => {
//         return res ? null : { emailTaken: true };
//       }));
//     };
//   }
// }