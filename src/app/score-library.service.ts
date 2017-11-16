import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export interface Score {
  title: string;
  author: string;
  tempo: number;
  music: string;
}

// Useful ?
interface ScoreId extends Score {
  id: string;
}

@Injectable()
export class ScoreLibraryService {
  static readonly SCORE_COLLECTION = 'scores';

  constructor(private afs: AngularFirestore) {}

  public add(score: Score): void {
    // Adding a document using a generated ID
    this.afs.collection(ScoreLibraryService.SCORE_COLLECTION).add(score);
    // Adding a document using a custom ID
    // this.afs.collection('posts').doc(THE_CUSTOM_ID).set(score);
  }

  public get(id: string): Observable<Score> {
    const document: AngularFirestoreDocument<Score> = this.afs.doc(`${ScoreLibraryService.SCORE_COLLECTION}/` + id);
    const score: Observable<Score> = document.valueChanges();
    return score;
  }

  public getAll(): any {
    // Retrieve scores collection, without any filtering
    const collection: AngularFirestoreCollection<Score> = this.afs.collection(ScoreLibraryService.SCORE_COLLECTION);
    // Retrieve posts collection, filtering to get only those with a title of "test"
    // this.postsCol = this.afs.collection('posts', ref => ref.where('title', '==', 'test'));
    return collection.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Score;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });
  }

  public delete(id: string): void {
    this.afs.doc(`${ScoreLibraryService.SCORE_COLLECTION}/` + id).delete();
  }
}
