import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tab1Page } from './tab1.page';
import { FirestoreService } from '../services/firestore.service';
import { of } from 'rxjs';

describe('Tab1Page', () => {
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;

  const firestoreMock = {
    getTareas: () => of([]),
    getNotas: () => of([])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tab1Page],
      providers: [
        { provide: FirestoreService, useValue: firestoreMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
