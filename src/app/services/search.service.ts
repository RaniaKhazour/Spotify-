import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchValue = new BehaviorSubject<string>('');
  currentSearch = this.searchValue.asObservable();
  
  constructor() { }

  updateSearch(value: string) {
    this.searchValue.next(value);
  }
  
}
