import { Component, OnInit, ViewChild } from '@angular/core';
import { Release } from 'src/app/framework/models/release.model';
import { ReleaseManagementService } from 'src/app/framework/services/release-management.service';
import { MatTableDataSource, MatCheckboxChange } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ObjectManipulationService } from 'src/app/framework/services/object-manipulation.service'

@Component({
  selector: 'app-release-list',
  templateUrl: './release-list.component.html',
  styleUrls: ['./release-list.component.css']
})
export class ReleaseListComponent implements OnInit {
  public displayedColumns: string[] = ['featureTitle', 'releaseDefinitionName', 'releaseName', 'artifactVersion', 'environments'];
  public dataSource = new MatTableDataSource();
  public selectedReleases: Map<string, string> = new Map();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private releaseManagementService: ReleaseManagementService,
    private objectManipulationService: ObjectManipulationService
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getReleases();
  }

  getReleases() {
    this.releaseManagementService
      .getReleases()
      .subscribe((releases: Release[]) => {
        this.dataSource.data = releases;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filterPredicate = (data, filter) => {
      let reducedObjectString = this.objectManipulationService.reduceObjectToString(data);
      
      return reducedObjectString.indexOf(filter) > -1
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEnvironmentChange(releaseId: string, releaseEnvironmentId: string, event: any) {
    if (event.target.checked) {
      this.selectedReleases.set(event.target.id, `${releaseId},${releaseEnvironmentId}`);
    } 
    else {
      this.selectedReleases.delete(event.target.id);
    }
  }

  onDeployClick() {
    this.releaseManagementService
      .deploySelectedReleases(Array.from(this.selectedReleases.values()))
      .subscribe(() => {
        this.getReleases();
      });
  }

  onRefreshClick() {
    this.getReleases();
  }
}
