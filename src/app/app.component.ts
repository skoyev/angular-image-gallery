import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ImageModalComponent } from './shared/components/image-modal/image-modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tpredic-Gallery-Test';
  searchInputValue = 'test';

  private eventsSubject = new Subject<any>();

  constructor() {}

  emitEventToChild(value: string) {
    this.searchInputValue = value;
    this.eventsSubject.next(this.searchInputValue);
  }
}
