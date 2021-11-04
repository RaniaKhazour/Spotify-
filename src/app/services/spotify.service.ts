import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../models/user.model';
import { Artist, ArtistDTO } from '../models/artist.model';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private token: string | null = null;
  private client_id = 'c87cf49c192747fb809ace7a373e5479'; 
  private redirect_uri = 'http://localhost:4200/login';
  private scope = 'user-read-private user-read-email';
  //private authorizationKey: string = `Bearer ${this.token}`;

  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Accept' : 'application/json',
  //     'Content-Type' : 'application/json',
  //     'Authorization' : this.authorizationKey
  //   })
  // }

  public logged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public artists$: BehaviorSubject<Artist[]> = new BehaviorSubject<Artist[]>([]);
  public searchValue$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public dataArtist$: BehaviorSubject<object> = new BehaviorSubject<object>({});;
  currentSearch = this.searchValue$.asObservable();


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
    this.logged$.next(true);
    this.router.navigate(['/home'], {queryParams: {token: this.token}});
  }

  logout() {
    this.token = null;
    this.logged$.next(false);
    this.router.navigate(['/logout']);
  }

  updateSearch(value: string) {
    this.searchValue$.next(value);
  }

  //fix repetition of headers

  //get user's profile 
  getUserInfo(token: string): Observable<User> {
    let userURL = `https://api.spotify.com/v1/me`;

    return this.httpClient.get<User>(userURL, 
      { headers: new HttpHeaders({
        'Accept' : 'application/json',
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      })
    });
  }

  //get all artists
  getAllArtists(value: string): Observable<Artist[]> {
    let artistURL = `https://api.spotify.com/v1/search?q=${value}&type=artist&limit=30`;
    //you can add a filter for the limit

    return this.httpClient.get<any>(artistURL, 
      { headers: new HttpHeaders({
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${this.token}`
    })
  }).pipe(map(res => { return res.artists.items.map(
    (artistsDto: ArtistDTO) => new Artist(artistsDto))}));
  }

}


  
