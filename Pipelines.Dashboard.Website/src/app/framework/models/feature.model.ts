import { Release } from './release.model'
import { Stage } from './stage.model';

export class Feature {
  public id: string;
  public targetProcessId: string;
  public assigned: string;
  public title: string;
  public description: string;
  public releaseDefinition?: string;
  public releases?: Release[];
  public stages?: Stage[];
  public tags?: string[];

  constructor() { 
    this.releases = [];
  }
}
