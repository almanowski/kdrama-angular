/**
 * This Dialog is used to log in users
 * @module UserLoginComponent
 */


import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// Import API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// Close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// Display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  // Gets the input data of the user and stores them in userData
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  /** 
   * Sends the form inputs (this.userData) to the backend (fetchApiData.userLogin)
   * @function loginUser
   * @param this.userData {object}
   * @returns Snackbar message
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      localStorage.setItem('token', response.token);
      localStorage.setItem('Username', response.user.Username);
      // Successful user registration
      this.dialogRef.close(); // This will close the modal on success
      this.snackBar.open('Login successful', 'OK', {
        duration: 2000,
        panelClass: 'action-success'
      });
      this.router.navigate(['dramas']);
    }, (response) => {
      this.snackBar.open('Login failed', 'OK', {
        duration: 2000
      });
    });
  }

}