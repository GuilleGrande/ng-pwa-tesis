import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  uploads: AngularFirestoreCollection<any>;
  // downloadURL: string;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage) { }

  uploadTask(path, file, meta) {
    const nameHash = Md5.hashStr(file.name + new Date().getTime());
    const fileExt = file.type.split('/')[1];
    const name = `${nameHash}.${fileExt}`;

    const ref = this.storage.ref(`${path}/${name}`);

    const task = ref.put(file, { customMetadata: meta });

    this.uploads = this.db.collection(path);

    task.snapshotChanges().subscribe((taskSnapshot) => {
        taskSnapshot.ref.getDownloadURL().then((downloadURL) => {
          const data = { name, downloadURL };
          this.uploads.add(data);
        });
        console.log('Saved as collection');
      });
  }
}
