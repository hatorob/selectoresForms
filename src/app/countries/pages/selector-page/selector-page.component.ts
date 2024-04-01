import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/country.interfaces';

@Component({
  selector: 'countries-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrl: './selector-page.component.css'
})
export class SelectorPageComponent implements OnInit {

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

  ngOnInit(): void {
    console.log("Desde el OnInit...");
    this.onRegionChanged();
  }

  get regions(): Region[] {
    return this.countriesServices.regions;
  }

  private onRegionChanged = (): void => {

    //this.myForm.controls['region']!.valueChanges
    this.myForm.get('region')!.valueChanges
        .subscribe( region => {
          console.log("Detectando el cambio del formulario con OnInit",{region});

        });

  }


}
