import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Score, ScoreLibraryService } from '../score-library.service';

@Component({
  selector: 'ymn-library',
  templateUrl: './ymn-library.component.html',
  styleUrls: ['./ymn-library.component.css']
})
export class YmnLibraryComponent implements OnInit {
  public scores: any;
  public preview: Observable<Score>;

  constructor(private library: ScoreLibraryService) { }

  ngOnInit() {
    this.scores = this.library.getAll();
  }

  public get(id: string): void {
    this.preview = this.library.get(id);
  }
}
