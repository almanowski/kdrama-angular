/**
 * This component renders user information
 * @module ProfileViewComponent
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserUpdateFormComponent } from '../user-update-form/user-update-form.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})

export class ProfileViewComponent implements OnInit {
  user: any;
  favs: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getFavDramas();
  }

  /** 
   * Gets current user from the backend (fetchApiData.getUser)
   * @function getCurrentUser
   * @returns user {object}
   */
  getCurrentUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => { 
      this.user = resp;
      return (this.user);
    });
  }

  /**
   * Opens user update dialog
   * @module UserUpdateFormComponent
   */
  openUserUpdateDialog(): void {
    this.dialog.open(UserUpdateFormComponent, {
      width: '280px'
    }).afterClosed().subscribe(()=> this.ngOnInit());
  }

  /**
   * Routes to DramaCardComponent
   * @module DramaCardComponent
   */
  openDramaCard(): void {
    this.router.navigate(['/dramas'])
  }

  /** 
   * Gets all dramas from the backend (fetchApiData.getAllDramas) 
   * and filters it with the current users favorite dramas. 
   * Otherwise the favorite dramas can't display drama.title etc. 
   * @function getFavDramas
   * @returns An array of drama objects that are in the user favorite list
   */
  getFavDramas(): void {
    this.fetchApiData.getAllDramas().subscribe((resp: any) => { 
      let favDramaId = this.user.FavDramas
      this.favs = resp.filter((d:any) => {
        return favDramaId.indexOf(d._id) >=0;
      });
    })   
  }

  /**
   * Sends the input (id) to the backend (fetchApiData.deleteFavDrama)
   * @function deleteUserFav
   * @param id {string}
   * @returns An updated array of drama objects
   */
  deleteUserFav(id: string): void {
    this.fetchApiData.deleteFavDrama(id).subscribe((resp: any) => {
      this.ngOnInit();
    });
  }

  /**
   * Deletes user from backend (fetchApiData.deleteFavDrama), clears local storage 
   * and redirects to WelcomePageComponent.
   * @function deleteUser
   * @returns Snackbar message
   */
  deleteUser(): void {
    if (confirm('Are you sure?')) {
      this.fetchApiData.deleteUser().subscribe(() => {
        localStorage.clear();
      });
      this.snackBar.open(this.user.Username, 'Account successfully deleted!', {
        duration: 2000,
        panelClass: 'action-del',
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      setTimeout(() => {
        this.router.navigate(['/welcome'])
      }, 2000)    
    }
  }

}
