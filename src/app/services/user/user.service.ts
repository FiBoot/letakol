import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { IUserData, IUser } from 'src/app/models/user.model';
import { FireStoreService, ECompare } from '../firestore/firestore.service';
import { auth } from 'firebase/app';
import { ModelFactoryService } from '../model-factory/model-factory.service';
import { UserStaticService } from './user.static-service';
import { UnexpectedError } from 'src/app/models/error/unexpected-error.error';
import { Observable } from 'rxjs';
import { IFireBaseItem, EItemType } from 'src/app/models/firebaseItem.model';
import { StorageService } from '../upload/storage.service';

interface ILoginForm {
  email: string;
  password: string;
}
interface IProfileForm {
  displayName: string;
  photoURL: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly TABLE_NAME = 'users';
  public userChange = new EventEmitter<IUser>();

  constructor(private _fireAuth: AngularFireAuth, private _firestore: FireStoreService, private _storage: StorageService) {
    this._fireAuth.authState.subscribe(firebaseUser => {
      if (firebaseUser) {
        this._firestore.searchOne<IUser>(this.TABLE_NAME, 'data.uid', ECompare.Equal, firebaseUser.uid)
          .then(user => this.updateUser(user))
          // a la connection google le compte auth est créé avant l'enregistrement en base
          // l'evenement de changement d'utilisateur est donc trigger avant la sauvegarde
          .catch(e => { });
      } else {
        this.updateUser(null);
      }
    });
  }

  public get user(): IUser { return UserStaticService.user; }

  public isLoggedIn(): boolean {
    return UserStaticService.user !== null;
  }

  private updateUser(user: IUser): void {
    UserStaticService.user = user;
    this.userChange.emit(user);
  }

  private newUser(firebaseUser: IUserData): Promise<IUser> {
    // trim data because firebaseUser has to much information (google Q object)
    const user = ModelFactoryService.generateUser({
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      isAnonymous: firebaseUser.isAnonymous
    });
    user.id = firebaseUser.uid;
    return this._firestore.add(user).then(() => user);
  }

  public register(form: ILoginForm): Promise<any> {
    return this._firestore.count(this.TABLE_NAME, 'data.email', ECompare.Equal, form.email).then(count =>
      (count === 0)
        ? this._fireAuth.auth.createUserWithEmailAndPassword(form.email, form.password)
          .then((userCredential: firebase.auth.UserCredential) => this.newUser(userCredential.user)
            .then(user => this.updateUser(user))
            // si l'enregistrement en base echoue, on supprime le firebase-auth créé
            .catch(err => this._fireAuth.auth.currentUser.delete()
              .then(() => Promise.reject(new UnexpectedError(err)))
            )
          )
        : Promise.reject(new Error(`IUser <${form.email}> already exists.`))
    );
  }

  public signIn(form: ILoginForm): Promise<any> {
    return this._firestore.searchOne<IUser>(this.TABLE_NAME, 'name', ECompare.Equal, form.email).then(user =>
      this._fireAuth.auth.signInWithEmailAndPassword(user.name, form.password)
        .then((userCredential: firebase.auth.UserCredential) => this.updateUser(user))
    );
  }

  public signInWithGoogle(): Promise<void> {
    return this._fireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(userCredential => {
      this._firestore.searchOne<IUser>(this.TABLE_NAME, 'data.uid', ECompare.Equal, userCredential.user.uid)
        // si l'utilisateur n'existe pas en base on l'ajoute en plus
        .catch(err => this.newUser(userCredential.user).then(user => this.updateUser(user)));
    });
  }

  public signOut(): Promise<void> {
    return this._fireAuth.auth.signOut();
  }

  public updateProfile(profile: IProfileForm): Promise<void> {
    return this._fireAuth.auth.currentUser.updateProfile(profile).then(() => {
      return this._firestore.searchOne<IUser>(this.TABLE_NAME, 'id', ECompare.Equal, this.user.id).then(user => {
        user.data.displayName = profile.displayName;
        user.data.photoURL = profile.photoURL;
        return this._firestore.update(user).then(() => this.updateUser(user));
      });
    });
  }

}
