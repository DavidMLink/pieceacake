import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  recipes = [];

  constructor(private recipeService: RecipeService, private router: Router) { 

  }

  ngOnInit() {
    this.getRecipesFromService()
  }

  getRecipesFromService(){
    let observable = this.recipeService.getRecipes();
    observable.subscribe(data => {
      console.log("Got the recipes!", data);
      console.log(data['values']);
      console.log(data['recipes']);
      this.recipes = data['recipes'];
    })
  }

  displayRecipe(){
    this.router.navigate(['/displayrecipe']);
  }

}
