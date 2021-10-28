import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  // searchValue: string = '';
  // artists: any;
  hide: boolean = false;

  constructor(private spotifyService: SpotifyService) { }
  
  
  ngOnInit(): void {}  

  login() {
    this.spotifyService.accessToken();
  }

  logout() {
    this.spotifyService.logout();
  }
}

// searchValue: string = '';

// constructor(private searchService: SearchService) { }

// ngOnInit(): void {
//   this.searchService.updateSearch(this.searchValue);
// }  

// this.searchService.currentSearch.subscribe(value => this.searchValue = value);

//search Artists
// searchArtists() {
//   this._spotifyService.getAllArtists(this.searchValue).subscribe(data => {
//     this.artists = data;
//   })
// }