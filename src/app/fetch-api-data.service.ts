import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'

// Declaring the api url will provide data for the client app
const apiURL = 'https://mykdrama-api.herokuapp.com/';

// Getting localStorage data for api access
const token = localStorage.getItem('token');
const username = localStorage.getItem('Username') || '';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HtpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  /** POST - Registration
   * Make api call to the /user endpoint
   * @function userRegistration
   * @param userDetails {Username: <string>, Password: <string>, Email: <string>, Birthday: <sting>}
   * @returns a new user object in JSON format
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiURL + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /** POST - Login
   * Make api call to the /login endpoint
   * @function userLogin
   * @param userDetails {Username: <string>, Password: <string>}
   * @returns a JSON object containing the user details and a JWT token
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiURL + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /** GET - Drama list 
   * Make api call to the /korean-dramas endpoint
   * @function getAllDramas
   * @returns a JSON object containing an array of dramas
   */
  getAllDramas(): Observable<any> {
    return this.http
      .get(apiURL + 'korean-dramas', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
          })
        })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /** GET - Specific drama
   * Make api call to the /korean-dramas/[title] endpoint
   * @function getOneDrama
   * @param title <string>
   * @returns a JSON object containing the drama details
   */
  getOneDrama(title: string): Observable<any> {
    return this.http
      .get(apiURL + `korean-dramas/${title}`, {
        headers: new HttpHeaders
          ({
            Authorization: 'Bearer ' + token,
          })
        })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /** GET - Specific director
   * Make api call to the /directors/[name] endpoint
   * @function getDirector
   * @param name <string>
   * @returns a JSON object containing the director details
   */
  getDirector(name: string): Observable<any> {
    return this.http
      .get(apiURL + `directors/${name}`, {
        headers: new HttpHeaders
          ({
            Authorization: 'Bearer ' + token,
          })
        })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /** GET - Genre list
   * Make api call to the /genres endpoint
   * @function getGenres
   * @returns a JSON object containing an array of genres
   */
  getGenres(): Observable<any> {
    return this.http
      .get(apiURL + 'genres', {
        headers: new HttpHeaders
          ({
            Authorization: 'Bearer ' + token,
          })
        })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /** GET - Specific genre
   * Make api call to the /genres/[name] endpoint
   * @function getDirector
   * @param genre <string>
   * @returns a JSON object containing the genre details
   */
  getOneGenre(genre: string): Observable<any> {
    return this.http
      .get(apiURL + `directors/${genre}`, {
        headers: new HttpHeaders
          ({
            Authorization: 'Bearer ' + token,
          })
        })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }


  /** GET - Specific user
   * Make api call to the /users/[username] endpoint
   * @function getUser
   * @returns a JSON object containing the user details
   */
  getUser(): Observable<any> {
    return this.http
      .get(apiURL + `users/${username}`, {
        headers: new HttpHeaders
          ({
            Authorization: 'Bearer ' + token,
          })
        })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /** GET - Favorite drama list
   * Make api call to the /users/[username] endpoint
   * @function getUser
   * @returns a JSON object containing an array of the favorite dramas
   */
 getFavDrama(): Observable<any> {
  return this.http
    .get(apiURL + `users/${username}/favs`, {
      headers: new HttpHeaders
        ({
          Authorization: 'Bearer ' + token,
        })
      })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
}

  /** POST - Favorite drama list
   * Make api call to the /users/[username]/favs/[dramaId] endpoint
   * @function postFavDrama
   * @param dramaId <string>
   * @returns a JSON object containing an array of the favorite dramas
   */
  postFavDrama(dramaId: string): Observable<any> {
    return this.http
      .post(apiURL + `users/${username}/favs/${dramaId}`, null, {
        headers: new HttpHeaders
          ({
            Authorization: 'Bearer ' + token,
          })
        })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /** PUT - User update
   * Make api call to the /user/[username] endpoint
   * @function putUserInfo
   * @param userData {Username: <string>, Password: <string>, Email: <string>, Birthday: <sting>}
   * @returns an updated user object in JSON format
   */
  putUserInfo(userData:any): Observable<any> {
    return this.http
      .put(apiURL + `users/${username}`, userData, {
        headers: new HttpHeaders
          ({
            Authorization: 'Bearer ' + token,
          })
        })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /** DELETE - Specific user
   * Make api call to the /users/[username] endpoint
   * @function deleteUser
   * @returns deletes user profile
   */
  public deleteUser(): Observable<any> {
  return this.http
    .delete(apiURL + `users/${username}`, {
      headers: new HttpHeaders
        ({
          Authorization: 'Bearer ' + token,
        })
      })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /** DELETE - Favorite drama list
   * Make api call to the /users/[username]/favs/[dramaId] endpoint
   * @function deleteFavDrama
   * @param dramaId <string>
   * @returns a JSON object containing an updated array of the favorite dramas
   */
  deleteFavDrama(dramaId: string): Observable<any> {
    return this.http
      .delete(apiURL + `users/${username}/favs/${dramaId}`, {
        headers: new HttpHeaders
          ({
            Authorization: 'Bearer ' + token,
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
    return throwError('Something bad happened; please try again later.');
  }
}
