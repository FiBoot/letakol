import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public loaded: boolean;
  public display: boolean;

  ngOnInit(): void {
    this.loaded = true;
  }

  public loaderCb(): void {
    this.display = true;
  }

}
