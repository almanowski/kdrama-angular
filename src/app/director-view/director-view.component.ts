/**
 * This Dialog is displays a specific director
 * @module DirectorViewComponent 
 */

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss']
})

/** 
 * Accesses director data from DramaCardComponent
 * @param data: {director:any}
 */
export class DirectorViewComponent {
  constructor(
    public dialogRef: MatDialogRef<DirectorViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {director: any}
  ) { }

}
