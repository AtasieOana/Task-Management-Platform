import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsersWorkspaceComponent } from './add-users-workspace.component';

describe('AddUsersWorkspaceComponent', () => {
  let component: AddUsersWorkspaceComponent;
  let fixture: ComponentFixture<AddUsersWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUsersWorkspaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUsersWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
