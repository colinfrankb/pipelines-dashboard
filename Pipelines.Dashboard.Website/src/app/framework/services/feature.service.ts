import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Feature } from '../models/feature.model';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private getWebApiUrl(endPoint: string) {
    return `${environment.webApiUrl}/${endPoint}`;
  }

  getFeature(id: string): Observable<Feature> {
    let url = `${this.getWebApiUrl('features')}/${id}`;
    
    return this.httpClient.get<Feature>(url);
  }

  getFeatures(): Observable<Feature[]> {
    return this.httpClient.get<Feature[]>(this.getWebApiUrl('features'));
  }

  createFeature(feature: Feature): Observable<Feature> {
    return this.httpClient.post<Feature>(this.getWebApiUrl('features'), feature);
  }

  updateFeature(feature: Feature) {
    let url = `${this.getWebApiUrl('features')}/${feature.id}`;

    return this.httpClient.put(url, feature);
  }

  deleteFeature(featureId: string) {
    let url = `${this.getWebApiUrl('features')}/${featureId}`;

    return this.httpClient.delete(url);
  }
}
