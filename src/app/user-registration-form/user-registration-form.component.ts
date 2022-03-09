/**
 * This Dialog is used to register new users
 * @module UserRegistrationComponent
 */

import { Component, OnInit, Input } from '@angular/core';

// Import API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// Close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// Display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  // Gets the input data of the user and stores them in userData
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  /** 
   * Sends the form inputs (this.userData) to the backend (fetchApiData.userRegistration)
   * @function registerUser
   * @param this.userData {object}
   * @returns Snackbar message
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(() => {
      // Successful user registration
      this.dialogRef.close(); // This will close the modal on success
      this.snackBar.open('User registered successfully!', 'OK', {
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
