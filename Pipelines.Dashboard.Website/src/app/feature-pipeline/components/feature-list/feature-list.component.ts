import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { Feature } from '../../../framework/models/feature.model';
import { FeatureService } from 'src/app/framework/services/feature.service';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class FeatureListComponent implements OnInit {
  public displayedColumns: string[] = [
    'targetProcessId', 
    'assigned', 
    'description'
  ];
  public filteredFeatures: Feature[];
  public unfilteredFeatures: Feature[];
  public expandedElement: Feature | null;

  constructor(private featureService: FeatureService) { }

  ngOnInit() {
    this.getFeatures();
  }

  getFeatures() {
    this.featureService
      .getFeatures()
      .subscribe((features: Feature[]) => {
        this.unfilteredFeatures = features;
        this.filteredFeatures = features;
      });
  }

  deployToEnvironment(event: Event) {
    event.stopPropagation();
  }

  deleteFeature(featureId: string) {
    this.featureService
      .deleteFeature(featureId)
      .subscribe(() => {
        this.getFeatures();
      });
  }

  applyFilter(filterValue: string) {
    this.filteredFeatures = this.unfilteredFeatures.filter(function(feature) {
      
    });
  }
}
