import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBoardInListComponent } from './show-board-in-list.component';

describe('ShowBoardListComponent', () => {
  let component: ShowBoardInListComponent;
  let fixture: ComponentFixture<ShowBoardInListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowBoardInListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBoardInListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
