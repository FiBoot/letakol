import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IFireBaseItem } from 'src/app/models/firebaseItem.model';
import { Mutex } from 'src/app/classes/mutex.class';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  public list: Array<IFireBaseItem>;
  public adminForm = new FormGroup({
    id: new FormControl,
    uid: new FormControl,
    name: new FormControl,
    data: new FormControl,
    creationDate: new FormControl,
    lastUpdateDate: new FormControl,
    public: new FormControl(true),
  });

  readonly mutex = new Mutex;

  public submit() { }

}
