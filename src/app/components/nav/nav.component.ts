import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/models/artist.model';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  searchValue: string = '';
  artists: Artist[] = new Array();
  logged: boolean = false;

  constructor(private spotifyService: SpotifyService) { }
  
  
  ngOnInit(): void {
    this.spotifyService.logged$.subscribe(res => this.logged = res);
    this.spotifyService.currentSearch.subscribe(value => this.searchValue = value);
  }  

  login() {
    this.spotifyService.accessToken();
  }

  logout() {
    this.spotifyService.logout();
    this.artists = [];
  }

  newSearch() {
    this.spotifyService.updateSearch(this.searchValue);
    if (this.searchValue !== '') {
      this.spotifyService.getAllArtists(this.searchValue).subscribe(data => {
        this.artists = data;
        this.spotifyService.artists$.next(this.artists);
      });
    } else {
      this.artists = [];
      this.spotifyService.artists$.next(this.artists);
    }
  }

}