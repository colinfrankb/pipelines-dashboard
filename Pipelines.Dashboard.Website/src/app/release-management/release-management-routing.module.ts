import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeploymentListComponent } from './components/deployment-list/deployment-list.component';
import { ReleaseListComponent } from './components/release-list/release-list.component';


const routes: Routes = [
  { path: 'release-management/deployments', component: DeploymentListComponent },
  { path: 'release-management/releases', component: ReleaseListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReleaseManagementRoutingModule { }
