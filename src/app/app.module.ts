import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// For communication with API
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material 
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';

import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { DramaCardComponent } from './drama-card/drama-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { DirectorViewComponent } from './director-view/director-view.component';
import { GenreViewComponent } from './genre-view/genre-view.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { UserUpdateFormComponent } from './user-update-form/user-update-form.component';


// App routes
const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent},
  { path: 'dramas', component: DramaCardComponent},
  { path: 'profile', component: ProfileViewComponent},
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix'},
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    DramaCardComponent,
    WelcomePageComponent,
    DirectorViewComponent,
    GenreViewComponent,
    DetailViewComponent,
    NavigationComponent,
    ProfileViewComponent,
    UserUpdateFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    RouterModule.forRoot(appRoutes),
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    MatToolbarModule,
    MatDividerModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
