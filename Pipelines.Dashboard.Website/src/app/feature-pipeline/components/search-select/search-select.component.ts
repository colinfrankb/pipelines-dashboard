import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { Selectable } from '../../../framework/interfaces/selectable.interface'

@Component({
  selector: 'app-search-select',
  templateUrl: './search-select.component.html',
  styleUrls: ['./search-select.component.css']
})
export class SearchSelectComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  
  @Input() placeholderLabel: string;
  @Input() items: Selectable[];
  @Output() change = new EventEmitter<Selectable>();

  public selectCtrl: FormControl = new FormControl();
  public searchInputCtrl: FormControl = new FormControl();
  public filteredItems: ReplaySubject<Selectable[]> = new ReplaySubject<Selectable[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  protected _onDestroy = new Subject<void>();

  constructor() { }

  ngOnInit() {
    this.searchInputCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filteritems();
      });
  }

  ngAfterViewInit() {
    this.filteredItems
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredItems are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: Selectable, b: Selectable) => a && b && a.id === b.id;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      let changedProp = changes[propName];

      if (!changedProp.isFirstChange()) {
        if (propName === "items") {
          this.setfilteredItems();
        }
      }
    }
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected setfilteredItems() {
    this.filteredItems.next(this.items.slice());
  }

  protected filteritems() {
    if (!this.items) {
      return;
    }

    let search = this.searchInputCtrl.value;

    if (!search) {
      this.filteredItems.next(this.items.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredItems.next(
      this.items.filter(rd => rd.name.toLowerCase().indexOf(search) > -1)
    );
  }

  public onSelectionChanged(event: MatSelectChange) {
    let foundItem = this.items.find(function(x, i) { 
      return x.id == event.value.id; 
    });

    this.change.emit(foundItem);
  }
}
