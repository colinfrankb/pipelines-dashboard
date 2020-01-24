import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';

import { FeaturePipelineRoutingModule } from './feature-pipeline-routing.module';
import { CreateComponent } from './components/create/create.component';
import { SearchSelectComponent } from './components/search-select/search-select.component';
import { FeatureListComponent } from './components/feature-list/feature-list.component';
import { UpdateComponent } from './components/update/update.component';


@NgModule({
  declarations: [CreateComponent, SearchSelectComponent, FeatureListComponent, UpdateComponent],
  imports: [
    CommonModule,
    FeaturePipelineRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatExpansionModule,
    MatListModule,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatCheckboxModule,
    MatChipsModule
  ]
})
export class FeaturePipelineModule { }
