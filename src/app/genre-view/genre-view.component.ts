import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss']
})
export class GenreViewComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<GenreViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  {genres: any}
  ) {
  console.log(data.genres) }

  ngOnInit(): void {
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
