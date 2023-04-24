import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  editProfile!: FormGroup;
  user_id?: any;

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {

    this.user_id = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log(id);
    });

    this.getLocalStorage()
  }

  getLocalStorage(){
    let data: string | null = localStorage.getItem('login')
    console.log(`DATA: ${data}`);

    let login = data ? JSON.parse(data) : null;
    console.log(`LOGIN: ${login}`);

    this.editProfile = new FormGroup({
      user_id: new FormControl(login.user.id),
      name: new FormControl(login.user.name),
      cpf: new FormControl(login.user.CPF),
      phone: new FormControl(login.user.phone),
      email: new FormControl(login.user.email),
      // image: new FormControl(''),
    })
  }

  async update(){
    const { value, valid } = this.editProfile;

    if(!valid){
      return
    }else{
      this.userService.update(this.user_id, value).subscribe((data: any) => {
        console.log(`dados alterados`);
        localStorage.setItem('login', JSON.stringify(data))
      },
      (err) => {
        console.log(`falha ao atualizar os dados ${err}`);

      })
      // const formData = new FormData();
      // formData.append('name', value.name);
      // formData.append('CPF', value.cpf);
      // formData.append('phone', value.phone);
      // formData.append('email', value.email);
      // formData.append('image', value.image);
    }
  }

  onFileSelect(e: any){
    const file: File = e.target.files[0]

    this.editProfile.patchValue({image: file})

  }

}
