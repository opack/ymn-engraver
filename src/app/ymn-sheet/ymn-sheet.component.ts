import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { YmnScore } from '../score-elements/ymn-score';
import * as Konva from 'konva';

@Component({
  selector: 'ymn-sheet',
  templateUrl: './ymn-sheet.component.html',
  styleUrls: ['./ymn-sheet.component.css']
})
export class YmnSheetComponent implements OnInit, OnChanges {
  @Input()
  public music: string;
  @Input()
  public author: string;
  @Input()
  public title: string;
  @Input()
  public tempo: number;
  private stage: Konva.Stage;

  constructor() {
  }

  ngOnInit() {
    this.stage = new Konva.Stage({
      container: 'container',   // id of container <div>
      width: 1000,
      height: 800,
      // Offset the stage so that all child objects are shifted of 0.5.
      // This fixes the "blurry lines" problem.
      x: 0.5,
      y: 0.5
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.music === undefined) {
      return;
    }
    const score = new YmnScore(this.title, this.author, this.tempo);
    score.parse(this.music);
    score.layout();

    this.stage.clear();
    this.stage.add(score.shape);
  }

}
