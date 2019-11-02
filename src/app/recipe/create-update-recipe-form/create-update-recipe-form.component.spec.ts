import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateRecipeFormComponent } from './create-update-recipe-form.component';

describe('CreateUpdateRecipeFormComponent', () => {
  let component: CreateUpdateRecipeFormComponent;
  let fixture: ComponentFixture<CreateUpdateRecipeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateRecipeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateRecipeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
