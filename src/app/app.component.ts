import { Component, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';
import { FileUtils } from '../utils/file-utils';
import { StringUtils } from '../utils/string-utils';
import { YmnSheetComponent } from './ymn-sheet/ymn-sheet.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title;
  public author;
  public tempo;
  public score;
  @ViewChild('ymnSheet') ymnSheet: YmnSheetComponent;


  public engrave(): void {
    this.ymnSheet.engrave(this.score);
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
      type: "text/plain;charset=utf-8"
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
}
