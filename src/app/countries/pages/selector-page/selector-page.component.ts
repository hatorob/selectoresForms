import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/country.interfaces';

@Component({
  selector: 'countries-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrl: './selector-page.component.css'
})
export class SelectorPageComponent {

  public myForm: FormGroup = this.fb.group({
    region: [ '', Validators.required ],
    country: [ '', Validators.required ],
    borders: [ '', Validators.required ],
  })

  //! Injectación de FormBuilder para trabajar más comodo formsReactives
  constructor(
    private fb: FormBuilder,
    private countriesServices: CountriesService
  ) {

  }

  get regions(): Region[] {
    return this.countriesServices.regions;
  }



}
