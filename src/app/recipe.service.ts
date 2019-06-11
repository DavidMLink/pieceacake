import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { map, filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  httpHeaders = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'})

  constructor(private _http : HttpClient) { }

  // CRUD 

        // CREATE
        createRecipe(recipe){
          return this._http.post('/RecipeCRUD', recipe);
        }

        // READ
        getRecipes(){
          return this._http.get('/RecipeCRUD');
        }

        getRecipe(){
          return this._http.get('/RecipeCRUD/:pk');
        }

        // UPDATE
        updateRecipe(recipe){
          return this._http.post('/RecipeCRUD/:pk', recipe);
        }

        // DELETE
        deleteRecipe(){
          return this._http.delete('/RecipeCRUD/:pk');
        }

  // END OF CRUD
}