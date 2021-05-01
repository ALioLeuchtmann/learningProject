import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortViewComponent } from './sort-view.component';

describe('SortViewComponent', () => {
  let component: SortViewComponent;
  let fixture: ComponentFixture<SortViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
