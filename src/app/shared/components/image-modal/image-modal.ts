import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent implements OnInit {
  @Input() title;
  @Input() imageUrl;
  @Input() showPreviuos;
  @Input() showNext;

  @Output() onNext = new EventEmitter();
  @Output() onPreviouos = new EventEmitter();

  constructor(public imageModal: NgbActiveModal) {}

  ngOnInit() {}  
}