import { Injectable } from '@angular/core';
import { ReleaseDefinition } from '../models/release-definition.model';
import { Release } from '../models/release.model';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Deployment } from '../models/deployment.model';

@Injectable({
  providedIn: 'root'
})
export class ReleaseManagementService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private getWebApiUrl(endPoint: string) {
    return `${environment.webApiUrl}/releasemanagement/${endPoint}`;
  }

  getReleaseDefinitions(): Observable<ReleaseDefinition[]> {
    return this.httpClient.get<ReleaseDefinition[]>(this.getWebApiUrl('releasedefinitions'));
  }

  getReleases(releaseDefinitionId?: string): Observable<Release[]> {
    return this.httpClient.get<Release[]>(
      this.getWebApiUrl('releases'), releaseDefinitionId ? { 
        params: {
          'releaseDefinitionId': releaseDefinitionId
        }
      } : {}
    );
  }

  getDeployments(): Observable<Deployment[]> {
    return this.httpClient.get<Deployment[]>(this.getWebApiUrl('deployments'));
  }

  deploySelectedReleases(selectedReleases: string[]) {
    return this.httpClient.post(this.getWebApiUrl('deployselectedreleases'), selectedReleases);
  }
}
