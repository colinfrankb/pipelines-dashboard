import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatChipInputEvent } from '@angular/material/chips';
import { Feature } from '../../../framework/models/feature.model'
import { Release } from '../../../framework/models/release.model'
import { ReleaseDefinition } from '../../../framework/models/release-definition.model'
import { FeatureService } from 'src/app/framework/services/feature.service';
import { ReleaseManagementService } from 'src/app/framework/services/release-management.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public model: Feature = new Feature();
  public submitted: boolean = false;
  public releaseDefinitions: ReleaseDefinition[];
  public releases: Release[];
  public separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private route: ActivatedRoute,
    private featureService: FeatureService,
    private releaseManagementService: ReleaseManagementService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.featureService
      .getFeature(
        this.route.snapshot.paramMap.get('id')
      )
      .subscribe((feature: Feature) => {
        this.model = feature;
      });
    this.releaseManagementService
      .getReleaseDefinitions()
      .subscribe((releaseDefinitions: ReleaseDefinition[]) => {
        this.releaseDefinitions = releaseDefinitions;
      });
    this.releases = [];
  }

  onRemove(releaseId: string) {
    for (var i = 0;i < this.model.releases.length; i++) {
      if (this.model.releases[i].id === releaseId) {
        this.model.releases.splice(i, 1);
        i--;
      }
    }
  }

  onSubmit() { 
    this.submitted = true; 

    this.featureService
      .updateFeature(this.model)
      .subscribe(() => {
        this.snackBar.open('Feature updated successfully', null, {
          duration: 3 * 1000,
        });
      });
  }

  onReleaseDefinitionChanged(selectedReleaseDefinition: ReleaseDefinition) {
    this.releaseManagementService
      .getReleases(selectedReleaseDefinition.id)
      .subscribe((releases: Release[]) => {
        this.releases = releases
      });
  }

  onReleaseChanged(selectedRelease: Release) {
    this.model.releases.push(selectedRelease);
  }

  addTag(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.model.tags = this.model.tags || [];
      this.model.tags.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: string) {
    const index = this.model.tags.indexOf(tag);

    if (index >= 0) {
      this.model.tags.splice(index, 1);
    }
  }
}
