import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowWorkspaceComponent } from './show-workspace.component';

describe('ShowWorkspaceComponent', () => {
  let component: ShowWorkspaceComponent;
  let fixture: ComponentFixture<ShowWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowWorkspaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
