import { Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { Address } from 'src/app/models/Address';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {
  // access_token: string = '';
  addresses?: Address[];

  // addressForm = FormGroup;
  //   street: '',
  //   number: '',
  //   zip_code: '',
  //   district: '',
  //   city: '',
  //   state: '',
  // });

  // addressFormData: Address = {
  //   street: '',
  //   number: '',
  //   zip_code: '',
  //   district: '',
  //   city: '',
  //   state: '',
  // }

  private subscription: Subscription = Subscription.EMPTY;

  constructor(
    public addressService: AddressService
  ){}

  ngOnInit(): void {

    // this.addressForm = new FormGroup({
    //   street: new FormControl('',[Validators.required]),
    //   number: new FormControl('',[Validators.required]),
    //   zip_code: new FormControl('',[Validators.required]),
    //   district: new FormControl('',[Validators.required]),
    //   ciry: new FormControl('',[Validators.required]),
    //   state: new FormControl('',[Validators.required]),
    // })
  }

  getLocalStorage(){
    let data: string | null = localStorage.getItem('login')
    console.log(`DATA: ${data}`);

    let login = data ? JSON.parse(data) : null;
    // this.access_token = login.access_token
    console.log(`LOGIN: ${login}`);
  }

  getAddress(){
    this.subscription = this.addressService.getAddress().subscribe(
      (data: any) => {
        localStorage.setItem('addresses', JSON.stringify(data))
        this.addresses = data.results
      },
      (err: any) => {
        console.log(`erro: ${err}`);
      },
      () => {
        console.log('Completed!');
      }
    )
  }

  // onSave(){
  //   const { value, valid }: any =  this.addressForm;

  //   if(valid){
  //     this.addressFormData.street = value.street;
  //     this.addressFormData.number = value.number;
  //     this.addressFormData.district = value.district;
  //     this.addressFormData.city = value.city;
  //     this.addressFormData.state = value.state;
  //     this.addressFormData.zip_code = value.zip_code;

  //     this.subscription = this.addressService.postAddress(this.addressFormData).subscribe(
  //       (data: any) => {
  //         // localStorage.setItem('address', data)
  //         console.log(JSON.stringify(data));

  //       },
  //       (err: any) => {
  //         console.log(`erro: ${JSON.stringify(err)}`);
  //       },
  //       () => {
  //         console.log('Completed!');
  //       }
  //     )
  //   }
}

