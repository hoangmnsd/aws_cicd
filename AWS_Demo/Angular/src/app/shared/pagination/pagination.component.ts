import {Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})
export class PagingComponent implements OnInit, OnChanges {
  @Input() index = 0;
  @Input() pageSize = 1;
  @Input() totalItems = 1;
  @Input() range = 3;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  currentPage: number;
  totalPages: number;
  $pages: Observable<number[]>;

  constructor() { }

  ngOnInit() {
    this.generatePagesNumber(this.index, this.pageSize, this.totalItems);
  }

  ngOnChanges() {
    this.generatePagesNumber(this.index, this.pageSize, this.totalItems);
  }

  generatePagesNumber(index: number, pageSize: number, totalItems: number) {
    this.currentPage = this.getCurrentPage(index, pageSize);
    this.totalPages = this.getTotalPages(totalItems, pageSize);
    this.$pages = Observable.range(-this.range, this.range * 2 + 1)
      .map(offset => this.currentPage + offset)
      .filter(page => this.isValidPageNumber(page, this.totalPages))
      .toArray();
  }

  getCurrentPage(index: number, pageSize: number): number {
    return Math.floor(index / pageSize) + 1;
  }

  getTotalPages(totalItems: number, pageSize: number): number {
    return Math.ceil(Math.max(totalItems, 1) / Math.max(pageSize, 1));
  }

  isValidPageNumber(page: number, totalPages: number): boolean {
    return page > 0 && page <= totalPages;
  }

  selectPage(page: number, event: any) {
    event.preventDefault();
    if (this.isValidPageNumber(page, this.totalPages)) {
      this.pageChange.emit((page - 1) * this.pageSize);
    }
  }

  cancelEvent(event) {
    event.preventDefault();
  }
}
