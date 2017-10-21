import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YmnSheetComponent } from './ymn-sheet.component';

describe('YmnSheetComponent', () => {
  let component: YmnSheetComponent;
  let fixture: ComponentFixture<YmnSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YmnSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YmnSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
