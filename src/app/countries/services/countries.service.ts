import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interfaces/country.interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, map, of, tap } from 'rxjs';



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
    return this.http.get<Country[]>(`${this.URL}/region/${region}?fields=name,cca3,borders`)
                .pipe(
                  map( countries => countries.map( country => ({
                      name: country.name.common,
                      cca3: country.cca3,
                      borders: country.borders ?? []
                  }))
                  ),
                  //tap( response => console.log("tap desde service",response))
                );

  }

  public getCountryByCode = ( countryCode: string ): Observable<SmallCountry> => {
    if( !countryCode ) return of();
    return this.http.get<Country>(`${this.URL}/alpha/${countryCode}?fields=name,cca3,borders`)
                .pipe(
                  map( country => {
                    return {
                    name: country.name?.common,
                    cca3: country.cca3,
                    borders: country.borders ?? []
                    }
                  })
                )
  }

  public getCountryBordersByCode = (borders: string[] ): Observable<SmallCountry[]> => {

    if( !borders || borders.length === 0 ) return of([]);

    const countriesRequest: Observable<SmallCountry>[] = [];

    borders.forEach( (code) => {
      const request = this.getCountryByCode(code);
      countriesRequest.push(request);
    })

    return combineLatest( countriesRequest )

  }


}
