import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObjectManipulationService {

  constructor() { }

  reduceObjectToString(data): string {
    let result: string = "";

    for (let propName in data) {
      if (data.hasOwnProperty(propName)) {
        if (typeof data[propName] === 'object') {
          result += this.reduceObjectToString(data[propName]);
        }
        else {
          result += data[propName];
        }
      }
    }

    return result.trim().toLowerCase();
  }
}
