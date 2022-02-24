import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'

// Declaring the api url will provide data for the client app
const apiURL = 'https://mykdrama-api.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HtpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // Making the api call for the user registration endpoint

  // Post registration
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiURL + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Post login
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiURL + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Get drama list
  getAllDramas(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiURL + 'korean-dramas', {
        headers: new HttpHeaders
          ({
            Authorization: 'Bearer' + token,
          })
        })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get one drama
  getOneDramas(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiURL + `korean-dramas/${title}`, {
        headers: new HttpHeaders
          ({
            Authorization: 'Bearer' + token,
          })
        })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get director
  getDirector(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiURL + `directors/${name}`, {
        headers: new HttpHeaders
          ({
            Authorization: 'Bearer' + token,
          })
        })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get genres
  getGenres(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiURL + 'genres', {
        headers: new HttpHeaders
          ({
            Authorization: 'Bearer' + token,
          })
        })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get one genre
  getOneGenre(genre: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiURL + `directors/${genre}`, {
        headers: new HttpHeaders
          ({
            Authorization: 'Bearer' + token,
          })
        })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }


  // Get user
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user')
    return this.http
      .get(apiURL + `users/${username}`, {
        headers: new HttpHeaders
          ({
            Authorization: 'Bearer' + token,
          })
        })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Add fav drama
  postFavDrama(dramaId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user')
    return this.http
      .post(apiURL + `users/${username}/favs/${dramaId}`, {
        headers: new HttpHeaders
          ({
            Authorization: 'Bearer' + token,
          })
        })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Update user info
  putUserInfo(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user')
    return this.http
      .put(apiURL + `users/${username}`, {
        headers: new HttpHeaders
          ({
            Authorization: 'Bearer' + token,
          })
        })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Delete user
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user')
    return this.http
      .delete(apiURL + `users/${username}`, {
        headers: new HttpHeaders
          ({
            Authorization: 'Bearer' + token,
          })
        })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Add fav drama
  deleteFavDrama(dramaId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user')
    return this.http
      .delete(apiURL + `users/${username}/favs/${dramaId}`, {
        headers: new HttpHeaders
          ({
            Authorization: 'Bearer' + token,
          })
        })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }



  // Non-typed response extraction
  private extractResponseData(data: any | Object): any {
    return data || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.'    );
  }
}
