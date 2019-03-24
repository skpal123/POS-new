import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufactureEntryComponent } from './manufacture-entry.component';

describe('ManufactureEntryComponent', () => {
  let component: ManufactureEntryComponent;
  let fixture: ComponentFixture<ManufactureEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufactureEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufactureEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
