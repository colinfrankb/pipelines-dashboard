import { ReleaseDefinition } from './release-definition.model'
import { Feature } from './feature.model';

export class Release {
  public id: string;
  public name: string;
  public releaseDefinition: ReleaseDefinition;
  public artifactVersion: string;
  public feature: Feature
}
