import { Component, OnInit, ViewChild } from '@angular/core';
import { Deployment } from 'src/app/framework/models/deployment.model';
import { ReleaseManagementService } from 'src/app/framework/services/release-management.service';
import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-deployment-list',
  templateUrl: './deployment-list.component.html',
  styleUrls: ['./deployment-list.component.css']
})
export class DeploymentListComponent implements OnInit {
  public displayedColumns: string[] = ['releaseDefinitionName', 'environmentName', 'completedOn'];
  public dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private releaseManagementService: ReleaseManagementService
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getDeployments();
  }

  getDeployments() {
    this.releaseManagementService
      .getDeployments()
      .subscribe((deployments: Deployment[]) => {
        this.dataSource.data = deployments;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onRefreshClick() {
    this.getDeployments();
  }
}
