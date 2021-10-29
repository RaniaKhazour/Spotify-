import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-artist',
  templateUrl: './detail-artist.component.html',
  styleUrls: ['./detail-artist.component.scss']
})
export class DetailArtistComponent implements OnInit {

  id: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }

  goBack(): void {
    this.location.back();
  }

}
