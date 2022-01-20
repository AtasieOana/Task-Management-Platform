import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTaskListComponent } from './show-task-list.component';

describe('ShowTaskListComponent', () => {
  let component: ShowTaskListComponent;
  let fixture: ComponentFixture<ShowTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTaskListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
