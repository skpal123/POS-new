import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDatatableDetailsInfoComponent } from './custom-datatable-details-info.component';

describe('CustomDatatableDetailsInfoComponent', () => {
  let component: CustomDatatableDetailsInfoComponent;
  let fixture: ComponentFixture<CustomDatatableDetailsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomDatatableDetailsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDatatableDetailsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
