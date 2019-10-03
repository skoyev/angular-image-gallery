import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GalleryComponent } from './modules/gallery/gallery.component';
import { ImageComponent } from './modules/image/image.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CoreModule } from './core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        GalleryComponent,
        ImageComponent
      ],
      imports: [
        InfiniteScrollModule,
        CoreModule,
        NgbModule    
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Tpredic-Gallery-Test'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Tpredic-Gallery-Test');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Tpredict Image Searcher');
  });
});
