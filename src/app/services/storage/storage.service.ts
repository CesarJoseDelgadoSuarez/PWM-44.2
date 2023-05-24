import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { finalize, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: AngularFireStorage) {

  }

  uploadFile(file: File, path: string){
    const fileRef = this.storage.ref(path)
    console.log("Vamos a subir el fichero");
    const task = this.storage.upload(path,file);
    console.log("Empezamos a subir el fichero");

    task.snapshotChanges().pipe(finalize(() => {
      console.log("Finalizado la subida");

    })).subscribe();

    return from(task.then(() => {
      return fileRef.getDownloadURL()
    }))
  }

}
