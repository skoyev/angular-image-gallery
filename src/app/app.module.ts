
import { NgModule } from '@angular/core';
import {GalleryModule} from './modules/gallery/gallery.module';
import { BrowserModule } from '@angular/platform-browser';

import {CoreModule} from './core/core.module';

import { AppComponent } from './app.component';
import { ImageModalComponent } from './shared/components/image-modal/image-modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ImageModalComponent
  ],
  imports: [
    BrowserModule,
    GalleryModule,
    CoreModule,
    NgbModule
  ],
  providers: [],
  entryComponents: [ImageModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
