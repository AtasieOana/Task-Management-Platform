import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTaskInSortComponent } from './show-task-in-sort.component';

describe('ShowTaskInSortComponent', () => {
  let component: ShowTaskInSortComponent;
  let fixture: ComponentFixture<ShowTaskInSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTaskInSortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTaskInSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
