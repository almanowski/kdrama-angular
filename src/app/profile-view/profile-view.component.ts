import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

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
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    /* this.getFavDramas(); */
  }

  getCurrentUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => { 
      this.user = resp;
      /* this.favs = resp.FavDramas; */
      console.log(this.user);
      return (this.user/* , this.favs */);
    });
  }

/*   getFavDramas(): void {
    let dramas: any[] = [];
    this.fetchApiData.getAllDramas().subscribe((resp: any) => { 
      dramas = resp;
      let fav = this.user.FavDramas
      fav && dramas.map((dramas) => {
        if ( dramas._id === fav.find((fav:any) => fav === dramas._id)) {
          return (fav)
        }
        console.log(dramas)
      })
    })     
  } */


  deleteUserFav(id: string): void {
    this.fetchApiData.deleteFavDrama(id).subscribe((resp: any) => {
      window.location.reload();
    });
  }

  deleteUser(): void {
    if (confirm('Are you sure?')) {
      this.router.navigate(['Welcome'])
    }
    this.router.navigate(['Welcome'])
    this.fetchApiData.deleteUser().subscribe(() => {
      localStorage.clear();
    });
  }

}
