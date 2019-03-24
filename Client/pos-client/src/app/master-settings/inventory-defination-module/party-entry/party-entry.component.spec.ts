import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyEntryComponent } from './party-entry.component';

describe('PartyEntryComponent', () => {
  let component: PartyEntryComponent;
  let fixture: ComponentFixture<PartyEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
