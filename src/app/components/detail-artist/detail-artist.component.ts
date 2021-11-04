import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-artist',
  templateUrl: './detail-artist.component.html',
  styleUrls: ['./detail-artist.component.scss']
})
export class DetailArtistComponent implements OnInit {

  id: string = "";
  dataArtist: object = {};

  constructor(private route: ActivatedRoute, private router: Router, private location: Location, private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.spotifyService.dataArtist$.subscribe(data => this.dataArtist = data);
    console.log(this.dataArtist)
  }

  goBack(): void {
    this.location.back();
  }

}
