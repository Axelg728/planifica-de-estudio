import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tab3Page } from './tab3.page';
import { FirestoreService } from '../services/firestore.service';
import { ModalController } from '@ionic/angular';
import { of } from 'rxjs';

describe('Tab3Page', () => {
  let component: Tab3Page;
  let fixture: ComponentFixture<Tab3Page>;

  const firestoreMock = {
    getNotas: () => of([]),
    addNota: jasmine.createSpy('addNota'),
    deleteNota: jasmine.createSpy('deleteNota')
  };

  const modalMock = {
    create: jasmine.createSpy('create').and.returnValue(
      Promise.resolve({
        present: () => Promise.resolve(),
        onDidDismiss: () => Promise.resolve({ data: null })
      })
    )
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tab3Page],
      providers: [
        { provide: FirestoreService, useValue: firestoreMock },
        { provide: ModalController, useValue: modalMock } // 👈 CLAVE
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
