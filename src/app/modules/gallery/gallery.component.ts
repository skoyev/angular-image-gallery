import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GalleryService } from 'src/app/core/services/gallery.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageModalComponent } from 'src/app/shared/components/image-modal/image-modal';
import * as _ from 'lodash';

// const getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&page=${page}&tag_mode=any&per_page=100&format=json&safe_search=1&nojsoncallback=1`;
// const baseUrl = 'https://api.flickr.com/';

@Component({
    selector: 'gallery',
    templateUrl: 'gallery.component.html',
    styleUrls: ['gallery.component.scss']
})
export class GalleryComponent {
    @Output() previousImage = new EventEmitter<object>();
    @Output() nextImage = new EventEmitter<object>();

    @Input() events: Observable<string>;

    private activeModalRef:any;
    private eventsSubscription: any;
    private gallery = [];
    private currentImageIndex:number;
    private throttle = 300;
    private scrollDistance = 1;
    private scrollUpDistance = 2;
    private currentPage:number = 1;
    private itemsPerPageCount:number = 100;
    private searchValue:string = 'flower';
    private showLoader:boolean = false;

    constructor(private httpClient: HttpClient, private galleryService: GalleryService, private modalService: NgbModal){}

    ngOnInit() {
        this.loadImageGallery(this.searchValue, this.currentPage);
        this.eventsSubscription = this.events.subscribe((searchValue) => {
            if(searchValue.length > 0 ){
                this.gallery = [];
                this.loadImageGallery(searchValue, this.currentPage)    
            }
        })
    }

    loadImageGallery(searchValue, page) {
        this.searchValue = searchValue;
        this.showLoader = true;
        this.galleryService.getCalendarData(searchValue, page).subscribe(res => {
            this.gallery.push(...res.photos.photo);
            this.showLoader = false;;
        });
    }

    onImageClick(photoIndex:number) {
        this.currentImageIndex = photoIndex;
        this.activeModalRef = this.modalService.open(ImageModalComponent);
        this.setImageModalContent(photoIndex);

        this.activeModalRef.componentInstance.onNext.subscribe((data) => {
            this.setImageModalContent(++this.currentImageIndex);
        });
        
        this.activeModalRef.componentInstance.onPreviouos.subscribe((data) => {
            this.setImageModalContent(--this.currentImageIndex);
        });
    }

    setImageModalContent(photoIndex:number){
        const photo = this.gallery[photoIndex];
        let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;    
        this.activeModalRef.componentInstance.title = photo.title;
        this.activeModalRef.componentInstance.imageUrl = url;
        this.activeModalRef.componentInstance.showPreviuos = photoIndex > 0;
        this.activeModalRef.componentInstance.showNext = photoIndex < (this.gallery.length - 1);
    } 

    ngOnDestroy() {
        if(this.eventsSubscription){
            this.eventsSubscription.unsubscribe()
        }
    }

    onScrollDown () {  
        this.loadImageGallery(this.searchValue, ++this.currentPage);
    }

    onUp() {
        if(this.currentPage > 1) {
            --this.currentPage;
            this.gallery = _.dropRight(this.gallery, this.itemsPerPageCount);
        }
    }
}
