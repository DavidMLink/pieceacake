import { Component } from '@angular/core';
import { RecipeService } from './recipe.service';
import {MapsService} from './maps.service';
import { RouterModule, Routes } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  lat: string = '';
  lng: string = '';
  country: string = '';

  location: Object;

  constructor(private recipeService : RecipeService, private mapService: MapsService){

  }

  ngOnInit(){
    // this.mapService.getLocation().subscribe(data => {
    //   console.log(data);
    //   this.lat = data.latitude;
    //   this.lng = data.longitude;
    //   this.country = data.country_name;
    // })
  }

  getRecipesFromService(){
    let observable = this.recipeService.getRecipes();
    observable.subscribe(data => {
      console.log(data);
    });
  }

  makeRecipe(){
    let recipe = {
      'recipe_name': "Bread",
      'ingredients': ["flour", "dough", "yeast"],
      'description': "Bready Goodness!"
    };



    let observable = this.recipeService.createRecipe(recipe);
    
    observable.subscribe(data => {
      console.log(data);
    });
  }

}