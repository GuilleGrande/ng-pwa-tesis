import { AuthService } from '../../core/auth.service';
import { AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFireStorage } from 'angularfire2/storage';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';



@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  user: User;
  editing: false;
  task: AngularFireUploadTask;
  downloadUrl: Observable<string>;
  path: string;
  meta: object;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private storage: AngularFireStorage,
    private location: Location
  ) {}

  ngOnInit() {
    this.getUser();
    this.setUploadData();
  }

  getUser() {
    return this.auth.user.subscribe(user => (this.user = user));
  }

  updateProfile() {
    return this.userService.updateProfileData(this.user.displayName, this.user.photoUrl);
  }

  updateEmail() {
    return this.userService.updateEmailData(this.user.email);
  }

  setUploadData() {
    return this.auth.user.subscribe((user) => {
      this.path = `users/${user.uid}/uploads`;
      this.meta = { uploader: user.uid };
    });
  }

  uploadPhoto(event): void {
    const file = event.target.files[0];
    const path = `users/${this.user.uid}/photos/${file.name}`;
    const fileRef = this.storage.ref(path);

    if (file.type.split('/')[0] !== 'image') {
      return alert('Only images allowed');
    } else {
      this.task = this.storage.upload(path, file);

      this.task.snapshotChanges().subscribe(() =>
        fileRef.getDownloadURL().subscribe((url) =>
          this.userService.updateProfileData(this.user.displayName, url)));
    }
  }

  goBack() {
    this.location.back();
  }
}
