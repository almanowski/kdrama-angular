import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';

import { DirectorViewComponent } from '../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DetailViewComponent } from '../detail-view/detail-view.component';

@Component({
  selector: 'app-drama-card',
  templateUrl: './drama-card.component.html',
  styleUrls: ['./drama-card.component.scss']
})
export class DramaCardComponent implements OnInit {
  dramas: any[] = [];
  userFavs: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getDramas();
    this.getUserFavs();
  }

  // Get all dramas
  getDramas(): void {
    this.fetchApiData.getAllDramas().subscribe((resp: any) => { 
      this.dramas = resp;
      console.log(this.dramas);
      return this.dramas;
    });
  }

  // Opens Director dialog 
  openDirectorDialog(director:object): void {
    this.dialog.open(DirectorViewComponent, {
      width: '350px',
      data: {director}
    });
  }

  // Opens Genre dialog 
  openGenresDialog(genres: any): void {
    this.dialog.open(GenreViewComponent, {
      width: '650px',
      data: {genres}
    });
  }

  // Opens Details dialog 
  openDetailsDialog(drama: any): void {
    this.dialog.open(DetailViewComponent, {
      width: '650px',
      data: {drama}
    });
  }

  // User favs
  getUserFavs(): void {
    this.fetchApiData.getFavDrama().subscribe((resp: any) => { 
      this.userFavs = resp.FavDramas;
      console.log(this.userFavs)
      return this.userFavs;
    });
  }

  // Check favs
  checkFavs(id: string): boolean {
    let favs = this.userFavs.indexOf(id) > -1;
    return favs;
  }

  // Post user fav
  postUserFav(id: string): void {
    this.fetchApiData.postFavDrama(id).subscribe((resp: any) => {
      window.location.reload();
    });
  }

  // Delete user fav
  deleteUserFav(id: string): void {
    this.fetchApiData.deleteFavDrama(id).subscribe((resp: any) => {
      window.location.reload();
    });
  }

}
