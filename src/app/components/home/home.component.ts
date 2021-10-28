import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchValue: string = '';
  artists: any;
  token: string = '';

  constructor(private spotifyService: SpotifyService, private router: Router,  private route: ActivatedRoute) { }
  
  
  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
    
    //toke expires in 3600 seconds
    //setTimeout() will redirect to the logout page where the user can login again
    setTimeout(() => { 
      this.router.navigate(['/logout']);
    }, 3600000);
  }
}

// this.searchService.currentSearch.subscribe(value => this.searchValue = value);


//search Artists
  // searchArtists() {
  //   this._spotifyService.getAllArtists(this.searchValue).subscribe(data => {
  //     this.artists = data;
  //   })
  // }