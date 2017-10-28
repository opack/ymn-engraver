import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { YmnScore } from '../score-elements/ymn-score';
import { ShapeConfig } from '../score-elements/shape-constants';
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
  private score: YmnScore;
  private continuationLinesLayer: Konva.Layer;

  constructor() {
  }

  ngOnInit() {
    this.stage = new Konva.Stage({
      container: 'container',   // id of container <div>
      width: 1000,
      height: 800,
      // Offset the stage so that all child objects are shifted of 0.5.
      // This fixes the "blurry lines" problem.
      x: ShapeConfig.stage.offset.x,
      y: ShapeConfig.stage.offset.y
    });

    this.continuationLinesLayer = new Konva.Layer({
      id: 'continuationLines'
    });
    this.stage.add(this.continuationLinesLayer);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.music === undefined) {
      return;
    }
    this.clearStage();

    const score = new YmnScore(this.title, this.author, this.tempo);
    this.score = score;
    score.parse(this.music);

    this.stage.clear();
    this.stage.add(score.shape);

    score.layout();
    this.stage.draw();
  }

  private clearStage(): void {
    if (this.score !== undefined) {
      this.score.shape.remove();
    }
    this.continuationLinesLayer.destroyChildren();
  }

}
