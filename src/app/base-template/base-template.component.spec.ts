import { TestBed } from '@angular/core/testing';
import { BaseTemplateComponent } from './base-template.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [BaseTemplateComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(BaseTemplateComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'dashboard'`, () => {
    const fixture = TestBed.createComponent(BaseTemplateComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('dashboard');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(BaseTemplateComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Welcome dashboard'
    );
  });
});
