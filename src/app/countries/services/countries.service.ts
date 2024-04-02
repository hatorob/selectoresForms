import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interfaces/country.interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class CountriesService {

  private URL: string = "https://restcountries.com/v3.1"
  //!  /region/europe?fields=name,cca3,borders

  private _region: Region[] = [ Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania ];

  constructor( private http: HttpClient ) { }

  get regions(): Region[] {
    return [...this._region];
  }

  public getCountriesByRegion = ( region: Region ): Observable<SmallCountry[]> => {

    if( !region ) return of([]);
    return this.http.get<SmallCountry[]>(`${this.URL}/region/${region}?fields=name,cca3,borders`)
                .pipe(
                  tap( response => console.log("tap desde service",response))
                );

  }

}
