import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interfaces';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'countries-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrl: './selector-page.component.css'
})
export class SelectorPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    region: [ '', Validators.required ],
    country: [ '', Validators.required ],
    border: [ '', Validators.required ],
  })

  public countriesByRegion: SmallCountry[] = [];
  public bordersByCountry!: string[];

  //! Injectación de FormBuilder para trabajar más comodo formsReactives
  constructor(
    private fb: FormBuilder,
    private countriesServices: CountriesService
  ) {

  }

  ngOnInit(): void {
    console.log("Desde el OnInit...");
    this.onRegionChanged();
    this.onCountryChanged();
  }

  get regions(): Region[] {
    return this.countriesServices.regions;
  }

  private onRegionChanged = (): void => {

    //this.myForm.controls['region']!.valueChanges
    this.myForm.get('region')!.valueChanges
        .pipe(
          tap( () => this.myForm.get('country')!.setValue('')),
          //switchMap( region => this.countriesServices.getCountriesByRegion(region) )
          switchMap( this.countriesServices.getCountriesByRegion )
        )
        .subscribe( countries => {
          this.countriesByRegion = countries
        });

  }

  private onCountryChanged = ():void => {
    this.myForm.get('country')!.valueChanges
        .pipe(
          tap( () => this.myForm.get('border')!.setValue('')),
          filter( (value:string) => value.length > 0),
          //switchMap( region => this.countriesServices.getCountriesByRegion(region) )
          switchMap( this.countriesServices.getCountryByCode )
        )
        .subscribe( country => {
          //console.log({borders});
          this.bordersByCountry = country.borders;
        });
  }


}
