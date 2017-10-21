import { Component } from '@angular/core';
import { YmnScore } from './score-elements/ymn-score';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public score = '\
0|10:2:7+3:x+* 10|9+5::2:5|2:*:*:*|*:*:*:*|10:2:7+3:*+* *+10\n\
B1|::::|:12:10:|10:*:*:*|*:*:*:*|::9:*\n\
B1| 2:10::7|:9: 5:10 5|:5 7:*:* 3|:5 7::| 2:10+7 2::10+7\n\
B2||7 ::3 10:|5 12::10 :|3 10:::|3 10::10:*|7 ::3 10: 10\
    ';
  public parsedMusic: YmnScore;

  private engrave(): void {
    const score = new YmnScore();
    score.parse(this.score);
    this.parsedMusic = score;
  }
}
