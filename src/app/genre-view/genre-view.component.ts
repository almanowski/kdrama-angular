/**
 * This Dialog is displays specific genres
 * @module DirectorViewComponent 
 */

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss']
})

/** 
 * Accesses genre data from DramaCardComponent
 * @param data: {genres:any}
 */ 
export class GenreViewComponent {

  constructor(
    public dialogRef: MatDialogRef<GenreViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  {genres: any}
  ) {}

  ngOnInit(): void {
  }

}
