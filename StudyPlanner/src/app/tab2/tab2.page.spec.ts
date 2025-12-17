import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tab2Page } from './tab2.page';
import { FirestoreService } from '../services/firestore.service';
import { ModalController } from '@ionic/angular';
import { of } from 'rxjs';

describe('Tab2Page', () => {
  let component: Tab2Page;
  let fixture: ComponentFixture<Tab2Page>;

  const firestoreMock = {
    getTareas: () => of([]),
    addTarea: jasmine.createSpy('addTarea'),
    updateTarea: jasmine.createSpy('updateTarea'),
    deleteTarea: jasmine.createSpy('deleteTarea')
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
      imports: [Tab2Page],
      providers: [
        { provide: FirestoreService, useValue: firestoreMock },
        { provide: ModalController, useValue: modalMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
