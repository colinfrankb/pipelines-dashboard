import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';

import { MatChipInputEvent } from '@angular/material/chips';
import { Feature } from '../../../framework/models/feature.model'
import { Release } from '../../../framework/models/release.model'
import { ReleaseDefinition } from '../../../framework/models/release-definition.model'
import { FeatureService } from 'src/app/framework/services/feature.service';
import { ReleaseManagementService } from 'src/app/framework/services/release-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  public model: Feature;
  public submitted: boolean = false;
  public releaseDefinitions: ReleaseDefinition[];
  public releases: Release[];
  public separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private router: Router,
    private featureService: FeatureService,
    private releaseManagementService: ReleaseManagementService
  ) {}

  ngOnInit() {
    this.model = new Feature();
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
      .createFeature(this.model)
      .subscribe((feature: Feature) => {
        this.router.navigateByUrl('/features');
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
