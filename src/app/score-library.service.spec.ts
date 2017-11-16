import { TestBed, inject } from '@angular/core/testing';

import { ScoreLibraryService } from './score-library.service';

describe('ScoreLibraryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScoreLibraryService]
    });
  });

  it('should be created', inject([ScoreLibraryService], (service: ScoreLibraryService) => {
    expect(service).toBeTruthy();
  }));
});
