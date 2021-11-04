import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Artist } from 'src/app/models/artist.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchValue: string = '';
  token: string = '';
  user: any;
  artists: Artist[] = new Array();
  now: Date = new Date();
  time: number = 12;
  dataArtist: object = {}; //object that contains all the data of an artist that has been clicked
  //put it in the spotify service

  constructor(private spotifyService: SpotifyService, private router: Router,  private route: ActivatedRoute) { }
  
  
  ngOnInit(): void {
    this.time = +this.now.toLocaleString('it-IT', { hour: 'numeric', hour12: false });

    this.token = this.route.snapshot.queryParams['token'];

    setTimeout(() => { 
      this.router.navigate(['/logout']);
    }, 3600000);

    this.spotifyService.currentSearch.subscribe(value => this.searchValue = value);

    this.spotifyService.getUserInfo(this.token).subscribe(res => { 
      this.user = res;
    });

    this.spotifyService.artists$.subscribe(results => this.artists = results);
  }

  artistData(artist: any) {
    let data = {
      id: artist.id,
      image: artist.image,
      name: artist.name,
      genres: artist.genres,
      followers: artist.followers.total | 0,
    }
    this.spotifyService.dataArtist$.next(data);
    //create the object with the info that you need on details and insert it on dataArtist$, through the spotify service

  }
}