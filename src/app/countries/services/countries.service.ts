import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interfaces/country.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _region: Region[] = [ Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania ];

  constructor() { }

  get regions(): Region[] {
    return [...this._region];
  }

  public getCountriesByRegion = ( region: Region ): SmallCountry[] => {
    return [];
  }

}
