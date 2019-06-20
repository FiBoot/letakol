import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

const MHW_API = 'https://mhw-db.com';

@Component({
  selector: 'app-mhw-api',
  templateUrl: './mhw-api.component.html',
  styleUrls: ['./mhw-api.component.css']
})
export class MhwApiComponent implements OnInit {
  loading: boolean = false;

  data: {
    items: Array<MHWItem>;
    skills: Array<MHWSkill>;
    decorations: Array<MHWDecoration>;
    weapons: Array<MHWWeapon>;
    charms: Array<MHWCharm>;
    armor: Array<MHWArmor>;
  } = {
    items: [],
    skills: [],
    decorations: [],
    weapons: [],
    charms: [],
    armor: []
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }

  private async loadData() {
    this.loading = true;
    const a = await Promise.all(
      Object.keys(this.data).map(key => this.http.get(`${MHW_API}/${key}`).toPromise())
    );
    this.loading = false;
  }
}
