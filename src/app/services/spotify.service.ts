import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private token: string | null = null;
  private client_id = 'c87cf49c192747fb809ace7a373e5479'; 
  private redirect_uri = 'http://localhost:4200/login';
  private scope = 'user-read-private user-read-email';

  constructor(private httpClient: HttpClient, private router: Router,  private route: ActivatedRoute) { }

  accessToken() {
    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(this.client_id);
    url += '&scope=' + encodeURIComponent(this.scope);
    url += '&redirect_uri=' + encodeURIComponent(this.redirect_uri);

    window.location.href = url;
  }

  getTokenFromURL() {
    let hash = window.location.hash;
    let startIndex = hash.search('access_token='); 
    let endIndex = hash.search('&token_type=');
    this.token = hash.slice(startIndex+13, endIndex);
    this.router.navigate(['/home'], {queryParams: {token: this.token}});
  }

  isLogged() {
    return this.token != null;
  }

  logout() {
    this.token = null;
    this.router.navigate(['/logout']);
  }

}

  // private authorizationKey = 'Bearer BQCrYZFy4PTNkg_0cid5kAMDQ-11OhIVZAEdcL3zvG41aKoSjk91ngcSd9k1BVjxqiOKFlE48d9jsX3dI11e9cghP4Q-_-tz_7zeudQFXS9Vt09O_CWtrU3WFycMbMmWKagS0WVq6sta8W82ljkuorLj-TD3mKyNC8N5wI7NPy74z4g';
  
  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Accept' : 'application/json',
  //     'Content-Type' : 'application/json',
  //     'Authorization' : this.authorizationKey
  //   })
  // }


   //get all artists
  // getAllArtists(searchValue: string): Observable<any> {
  //   let artistURL = `https://api.spotify.com/v1/search?q=${searchValue}&type=artist`;
  //   return this._httpClient.get<any>(artistURL, this.httpOptions);
  // }
