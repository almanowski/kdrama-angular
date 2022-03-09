/**
 * This Dialog is displays specific drama details
 * @module DirectorViewComponent 
 */

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})

/** 
 * Accesses drama data from DramaCardComponent
 * @param data: {drama:any}
 */
export class DetailViewComponent {
  constructor(
    public dialogRef: MatDialogRef<DetailViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {drama: any}
  ) { }

}
