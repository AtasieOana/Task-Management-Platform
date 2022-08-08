import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceInListComponent } from './workspace-in-list.component';

describe('WorkspaceInListComponent', () => {
  let component: WorkspaceInListComponent;
  let fixture: ComponentFixture<WorkspaceInListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceInListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceInListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
