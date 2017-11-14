import { Component, ViewChild, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';

import { FileUtils } from '../utils/file-utils';
import { StringUtils } from '../utils/string-utils';

import { YmnSheetComponent } from './ymn-sheet/ymn-sheet.component';
import { YmnDCRNTranslator } from './ymn-DCRN-translator';

import { TabsetComponent } from 'ngx-bootstrap';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// TODO Move this out of this file
interface Post {
  title: string;
  content: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public postsCol: AngularFirestoreCollection<Post>;
  public posts: Observable<Post[]>;
  public titledbg: string;
  public content: string;

  public title: string;
  public author: string;
  public tempo: string;
  public score: string = '\
T1|10.2.7+3.+* 10|9+5..2.5|2.*.*.*|*.*.*.*|\n\
B1|...|.12.10.|10.*.*.*|*.*.*.*|\n\
-\n\
B1| 2.10..7|.9.5.10 5|.5 7.*.* 3|.5 7..|\n\
B2|7 ..3 10.|5 12..10 .|3 0...|3 10..10.*|\n\
============================================\n\
T1|10.2.7+3.*+* *+10|\n\
B1|..9.*|\n\
-\n\
B1| 2.10+7 2..10+7|\n\
B2|7 ..3 10. 10|';
  @ViewChild('ymnSheet') ymnSheet: YmnSheetComponent;
  @ViewChild('viewTabs') viewTabs: TabsetComponent;

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.postsCol = this.afs.collection('posts');
    this.posts = this.postsCol.valueChanges();
  }

  addPost() {
    // Adding a document using a generated ID
    // this.afs.collection('posts').add({'title': this.titledbg, 'content': this.content});
    // Adding a document using a custom ID
    this.afs.collection('posts').doc(this.titledbg + this.content.substr(0, 5)).set({'title': this.titledbg, 'content': this.content});
  }

  public engrave(): void {
    this.ymnSheet.engrave(this.title, this.author, parseInt(this.tempo, 10), this.score);
    this.viewTabs.tabs[1].active = true;
  }

  public clear() {
    this.updateData('{}');
  }

  public save(): void {
    const data = {
      title: this.title,
      author: StringUtils.emptyIfUndefined(this.author),
      tempo: StringUtils.emptyIfUndefined(this.tempo),
      score: StringUtils.emptyIfUndefined(this.score)
    };
    const blob = new Blob([JSON.stringify(data)], {
      type: 'text/plain;charset=utf-8'
    });
    FileSaver.saveAs(blob, `${StringUtils.valueOrDefault(this.title, 'untitled')}.json`);
  }

  /**
   * Triggers the click on the (ugly) hidden input that allows the user to select a file
   * @param event
   * @param fileSelector
   */
  public triggerFileSelect(event, fileSelector) {
    fileSelector.click();
    event.preventDefault();
  }

  /**
   * Reads the selected file and then call updateData() with its content
   * @param event
   */
  private load(event): void {
    FileUtils.readTextFile(event, text => this.updateData(text));

    // Clear the input in order to be able to load the same file again later
    event.srcElement.value = '';
  }

  /**
   * Receives the read data from the file to load and update the state
   * of the application
   * @param text
   */
  private updateData(text: string) {
    const data = JSON.parse(text);

    this.title = data.title;
    this.author = data.author;
    this.tempo = data.tempo;
    this.score = data.score;

    this.engrave();
  }

  public translateFromDCRN(): void {
    const translator = new YmnDCRNTranslator();
    this.score = translator.translate(this.score);
  }
}
