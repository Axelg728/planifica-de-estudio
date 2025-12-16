import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tab4Page } from './tab4.page';
import { FirestoreService } from '../services/firestore.service';
import { of } from 'rxjs';

describe('Tab4Page', () => {
  let component: Tab4Page;
  let fixture: ComponentFixture<Tab4Page>;

  const firestoreMock = {
    getTareas: () => of([]),
    getNotas: () => of([])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tab4Page],
      providers: [
        { provide: FirestoreService, useValue: firestoreMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
