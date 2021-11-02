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
}