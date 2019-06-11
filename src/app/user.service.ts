import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { map, filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpHeaders = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'})

  constructor(private _http : HttpClient) { }

  // CRUD 

        // CREATE
        createUser(user){
          return this._http.post('/UserCRUD', user);
        }

        // READ
        getAllUsers(): Observable<[]>{
          return this._http.get<[]>('/UserCRUD');
        }

        getSingleUser(){
          return this._http.get('/UserCRUD/:pk');
        }

        // UPDATE
        updateUser(user){
          return this._http.post('/UserCRUD/:pk', user);
        }

        // DELETE
        deleteUser(){
          return this._http.delete('/UserCRUD/:pk');
        }

  // END OF CRUD

  checkEmailNotTaken(values: any): Observable<any> {
    console.log("SERVICE: Check Email");
    console.log(values);

    let params = new HttpParams();
    params = params.append('format', 'json');
    params = params.append('email', values);
    // let email = values;

    // return this._http.get('/registration/', {headers: this.httpHeaders, params: params, responseType:'text' as 'json'});
    return this._http.get('/registration/', {params: params});
  }
  
  loginUser(values: any): Observable<any>{
    console.log("SERVICE: Login User");
    return this._http.post('/loginUser', values, {headers: this.httpHeaders});
  }

  // checkEmailNotTaken(email: string) {
  //   console.log("EXECUTED EMAIL CHECK IN SERVICE!");
  //   return this._http
  //     .get('/UserEmail').pipe(map(res => res.json())
  //     .map(users => users.filter(user => user.email === email))
  //     .map(users => !users.length));
      
  // }

}
