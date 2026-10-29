import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { SiteContentService } from './core/site-content.service';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the header and the footer around the routed content', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-site-header')).toBeTruthy();
    expect(compiled.querySelector('main router-outlet')).toBeTruthy();
    expect(compiled.querySelector('app-site-footer')).toBeTruthy();
  });

  // Les liens de navigation doivent être absolus : depuis une page de détail,
  // une ancre nue (`#services`) ne désignerait aucune cible existante.
  it('should point every navigation link at the home page fragment', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const content = TestBed.inject(SiteContentService);

    const hrefs = Array.from(compiled.querySelectorAll('app-site-header nav a')).map((a) =>
      a.getAttribute('href'),
    );

    for (const link of content.navLinks) {
      expect(hrefs).toContain(`/#${link.fragment}`);
    }
  });
});
