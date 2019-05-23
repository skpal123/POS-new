import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDatatableControlSettingsComponent } from './custom-datatable-control-settings.component';

describe('CustomDatatableControlSettingsComponent', () => {
  let component: CustomDatatableControlSettingsComponent;
  let fixture: ComponentFixture<CustomDatatableControlSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomDatatableControlSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDatatableControlSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
