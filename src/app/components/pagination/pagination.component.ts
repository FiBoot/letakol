import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent<T> implements OnChanges {
  @Input() items: Array<T>;
  @Input() perPage = 8;
  @Input() currentPage = 1;

  @Output() currentPageChange = new EventEmitter<number>();
  @Output() displayedItemsChange = new EventEmitter<Array<T>>();

  ngOnChanges(_: SimpleChanges): void {
    if (this.items) {
      setTimeout(() => this.changePage(this.currentPage));
    }
  }

  public get lastPage(): number {
    return Math.ceil(this.items.length / this.perPage);
  }

  public changePage(page: number): void {
    this.currentPage =
      page * this.perPage < this.items.length
        ? page === 0 && this.items.length
          ? 1
          : page
        : this.lastPage;
    this.currentPageChange.emit(this.currentPage);
    this.displayedItemsChange.emit(this.displayedItems);
  }

  private get displayedItems(): Array<T> {
    const start = (this.currentPage - 1) * this.perPage;
    const end = this.currentPage * this.perPage;
    return this.items.slice(start, end > this.items.length ? this.items.length : end);
  }
}
