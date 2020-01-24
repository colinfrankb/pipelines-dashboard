import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateComponent } from './components/create/create.component';
import { UpdateComponent } from './components/update/update.component';
import { FeatureListComponent } from './components/feature-list/feature-list.component'

const routes: Routes = [
  { path: 'features', component: FeatureListComponent },
  { path: 'features/create', component: CreateComponent },
  { path: 'features/:id', component: UpdateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturePipelineRoutingModule { }
