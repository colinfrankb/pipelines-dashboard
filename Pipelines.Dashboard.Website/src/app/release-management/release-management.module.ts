import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ReleaseManagementRoutingModule } from './release-management-routing.module';
import { DeploymentListComponent } from './components/deployment-list/deployment-list.component';
import { ReleaseListComponent } from './components/release-list/release-list.component';


@NgModule({
  declarations: [DeploymentListComponent, ReleaseListComponent],
  imports: [
    CommonModule,
    ReleaseManagementRoutingModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ReleaseManagementModule { }
