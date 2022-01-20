import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInBoardComponent } from './user-in-board.component';

describe('UserInBoardComponent', () => {
  let component: UserInBoardComponent;
  let fixture: ComponentFixture<UserInBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
