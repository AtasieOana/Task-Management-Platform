import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTemplateInListComponent } from './show-template-in-list.component';

describe('ShowTemplateInListComponent', () => {
  let component: ShowTemplateInListComponent;
  let fixture: ComponentFixture<ShowTemplateInListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTemplateInListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTemplateInListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
