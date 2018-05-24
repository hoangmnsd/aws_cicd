import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SortService {

  constructor() { }

  private columnSortedSource = new Subject<ColumnSortedEvent>();

  columnSorted$ = this.columnSortedSource.asObservable();

  columnSorted(event: ColumnSortedEvent) {
    this.columnSortedSource.next(event);
  }

  getSortedData(unsortedData: any, criteria: ColumnSortedEvent): any {
    return unsortedData.sort((a, b) => {
      if (criteria.sortDirection === 'asc') {
        if (a[criteria.sortColumn] < b[criteria.sortColumn]) {
          return -1;
        }
        if (a[criteria.sortColumn] > b[criteria.sortColumn]) {
          return 1;
        }
        return 0;
      } else {
        if (a[criteria.sortColumn] > b[criteria.sortColumn]) {
          return -1;
        }
        if (a[criteria.sortColumn] < b[criteria.sortColumn]) {
          return 1;
        }
        return 0;
      }
    });
  }
}

export interface ColumnSortedEvent {
  sortColumn: string;
  sortDirection: string;
}
