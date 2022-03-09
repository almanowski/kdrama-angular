/**
 * This component renders drama collection and the NavigationComponent
 * @module DramaCardComponent
 */

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

  /** 
   * Gets all dramas from the backend (fetchApiData.getAllDramas)
   * @function getDramas
   * @returns An array of drama objects
   */
  getDramas(): void {
    this.fetchApiData.getAllDramas().subscribe((resp: any) => { 
      this.dramas = resp;
      return this.dramas;
    });
  }

  /**
   * Opens director dialog
   * @param director {object}
   * @module DirectorViewComponent
   */
  openDirectorDialog(director: object): void {
    this.dialog.open(DirectorViewComponent, {
      width: '650px',
      data: {director}
    });
  }

  /**
   * Opens genre dialog
   * @param genres {any}
   * @module GenreViewComponent
   */
  openGenresDialog(genres: any): void {
    this.dialog.open(GenreViewComponent, {
      width: '650px',
      data: {genres}
    });
  }

  /**
   * Opens details dialog
   * @param drama {any}
   * @module DetailViewComponent
   */
  openDetailsDialog(drama: any): void {
    this.dialog.open(DetailViewComponent, {
      width: '650px',
      data: {drama}
    });
  }

  /** 
   * Gets all the user favorite dramas from the backend (fetchApiData.getFavDrama)
   * @function getUserFavs
   * @returns An array of drama objects
   */
  getUserFavs(): void {
    this.fetchApiData.getFavDrama().subscribe((resp: any) => { 
      this.userFavs = resp.FavDramas;
      return this.userFavs;
    });
  }

  /** 
   * Checks if drama is in user favorite list
   * @function checkFavs
   * @returns Boolean
   */
  checkFavs(id: string): boolean {
    let favs = this.userFavs.indexOf(id) > -1;
    return favs;
  }

  /**
   * Sends the input (id) to the backend (fetchApiData.postFavDrama)
   * @function postUserFavs
   * @param id {string}
   * @returns An updated array of drama objects
   */
  postUserFav(id: string): void {
    this.fetchApiData.postFavDrama(id).subscribe((resp: any) => {
      this.ngOnInit();
    });
  }

  /**
   * Sends the input (id) to the backend (fetchApiData.deleteFavDrama)
   * @function deleteUserFavs
   * @param id {string}
   * @returns An updated array of drama objects
   */
  deleteUserFav(id: string): void {
    this.fetchApiData.deleteFavDrama(id).subscribe((resp: any) => {
      this.ngOnInit();
    });
  }

}
