import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { MapsService} from './maps.service';
import { UserService } from './user.service';
import { RecipeService } from './recipe.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';

// import { AgmCoreModule } from '@agm/core';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatChipsModule } from '@angular/material/chips';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
// import { faSearch } from '@fortawesome/pro-regular-svg-icons';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import { far } from '@fortawesome/pro-regular-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompareValidatorDirective } from './directives/compare-validator.directive';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { DisplayRecipeComponent } from './dashboard/display-recipe/display-recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    CompareValidatorDirective,
    DashboardComponent,
    // DisplayRecipeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    // AgmCoreModule.forRoot({
    //   apiKey: ''
    // }),
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    // MatInputModule,
    // MatSelectModule,
    // MatButtonModule,
    // MatCheckboxModule,
    // MatChipsModule,
    NgbModule.forRoot()
  ],
  providers: [MapsService, UserService, RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){
    // library.add(faSearch)
    library.add(fas, far, fal);
  }
}
