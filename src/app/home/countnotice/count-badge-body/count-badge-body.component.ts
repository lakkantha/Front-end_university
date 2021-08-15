import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-count-badge-body',
  templateUrl: './count-badge-body.component.html',
  styleUrls: ['./count-badge-body.component.css']
})
export class CountBadgeBodyComponent implements OnInit {
  count: number;
  constructor() { }

  ngOnInit(): void {
  }

}
