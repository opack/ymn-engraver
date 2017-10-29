import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { YmnScore } from '../score-elements/ymn-score';
import { ShapeConfig } from '../score-elements/shape-constants';
import * as Konva from 'konva';
import { FileUtils } from '../../utils/file-utils';

@Component({
  selector: 'ymn-sheet',
  templateUrl: './ymn-sheet.component.html',
  styleUrls: ['./ymn-sheet.component.css']
})
export class YmnSheetComponent implements OnInit {
  private stage: Konva.Stage;
  private score: YmnScore;
  private continuationLinesLayer: Konva.Layer;

  constructor() {
  }

  ngOnInit() {
    this.stage = new Konva.Stage({
      container: 'ymn-sheet-canvas',   // id of container <div>
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

  private clearStage(): void {
    if (this.score !== undefined) {
      this.score.shape.remove();
    }
    if (this.continuationLinesLayer !== undefined) {
      this.continuationLinesLayer.destroyChildren();
    }
  }

  public engrave(title: string, author: string, tempo: number, music: string) {
    this.clearStage();
    if (music === undefined) {
      return;
    }

    const score = new YmnScore(title, author, tempo);
    this.score = score;
    score.parse(music);

    this.stage.clear();
    this.stage.add(score.shape);

    score.layout();
    this.stage.draw();
  }

  public downloadImage(): void {
    var dataURL = this.stage.toDataURL({callback: function(){}});
    FileUtils.downloadURI(dataURL, `${this.score.title}.png`);
  }
}
