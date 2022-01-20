import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUserInBoardComponent } from './add-edit-user-in-board.component';

describe('AddEditUserInBoardComponent', () => {
  let component: AddEditUserInBoardComponent;
  let fixture: ComponentFixture<AddEditUserInBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditUserInBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditUserInBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
