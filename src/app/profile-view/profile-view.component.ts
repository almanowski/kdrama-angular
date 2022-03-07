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

  getCurrentUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => { 
      this.user = resp;
      return (this.user);
    });
  }

  openUserUpdateDialog(): void {
    this.dialog.open(UserUpdateFormComponent, {
      width: '280px'
    }).afterClosed().subscribe(()=> this.ngOnInit());
  }

  getFavDramas(): void {
    this.fetchApiData.getAllDramas().subscribe((resp: any) => { 
      let favDramaId = this.user.FavDramas
      this.favs = resp.filter((d:any) => {
        return favDramaId.indexOf(d._id) >=0;
      });
    })   
  }

  deleteUserFav(id: string): void {
    this.fetchApiData.deleteFavDrama(id).subscribe((resp: any) => {
      this.ngOnInit();
    });
  }

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
