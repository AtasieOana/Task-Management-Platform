import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditTaskListComponent } from './create-edit-task-list.component';

describe('CreateEditTaskListComponent', () => {
  let component: CreateEditTaskListComponent;
  let fixture: ComponentFixture<CreateEditTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditTaskListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
