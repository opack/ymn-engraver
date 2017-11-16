import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YmnLibraryComponent } from './ymn-library.component';

describe('YmnLibraryComponent', () => {
  let component: YmnLibraryComponent;
  let fixture: ComponentFixture<YmnLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YmnLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YmnLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
