// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import {ImageModule} from '../image/image.module';

// This Module's Components
import { GalleryComponent } from './gallery.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
@NgModule({
    imports: [
        CommonModule,
        ImageModule,
        InfiniteScrollModule
    ],
    declarations: [
        GalleryComponent
    ],
    exports: [
        GalleryComponent,
    ]
})
export class GalleryModule {

}
