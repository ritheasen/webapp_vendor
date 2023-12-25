import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogFormComponent } from './edit-dialog-form.component';

describe('EditDialogFormComponent', () => {
  let component: EditDialogFormComponent;
  let fixture: ComponentFixture<EditDialogFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDialogFormComponent]
    });
    fixture = TestBed.createComponent(EditDialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
