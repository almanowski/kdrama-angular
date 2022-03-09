/**
 * This Dialog is used to update users
 * @module UserUpdateFormComponent 
 */

import { Component, OnInit, Input } from '@angular/core';

// Import API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// Close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// Display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-update-form',
  templateUrl: './user-update-form.component.html',
  styleUrls: ['./user-update-form.component.scss']
})
export class UserUpdateFormComponent implements OnInit {
  // Gets the input data of the user and stores them in userData
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserUpdateFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  get username(): any {
    return localStorage.getItem('Username');
  }

  /** 
   * Sends the form inputs (this.userData) to the backend (fetchApiData.putUserInfo)
   * @function registerUser
   * @param this.userData {object}
   * @returns Snackbar message
   */
  updateUser(): void {
    this.fetchApiData.putUserInfo(this.userData).subscribe((res) => {
      localStorage.setItem('Username', res.Username)
      this.dialogRef.close(); // This will close the modal on success
      this.snackBar.open('User updated successfully!', 'OK', {
        duration: 2000,
        panelClass: 'action-success'
      });
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }

}
