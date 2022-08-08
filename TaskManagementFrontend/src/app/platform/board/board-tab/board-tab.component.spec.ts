import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardTabComponent } from './board-tab.component';

describe('BoardTabComponent', () => {
  let component: BoardTabComponent;
  let fixture: ComponentFixture<BoardTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
