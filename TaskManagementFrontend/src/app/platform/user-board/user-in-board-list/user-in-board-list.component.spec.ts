import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInBoardListComponent } from './user-in-board-list.component';

describe('UserInBoardListComponent', () => {
  let component: UserInBoardListComponent;
  let fixture: ComponentFixture<UserInBoardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInBoardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInBoardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
