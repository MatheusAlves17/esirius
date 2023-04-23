import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { signIn } from 'src/app/models/SignIn';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  isLogin: boolean = true;



  signInForm!: FormGroup;
  signUpForm!: FormGroup;
  signInData: signIn = {
    email: '',
    password: '',
  }
  signUpData: User = {
    name:'',
    // cpf:'',
    phone:'',
    email: '',
    password: '',
  }

  constructor(
    public dialogRef: MatDialogRef<AuthComponent>,
    public userService: UserService
  ){}

  ngOnInit(): void{
    this.signInForm = new FormGroup({
      emailSignIn: new FormControl('', [Validators.required]),
      passwordSignIn: new FormControl('', [Validators.required]),
    })

    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.min(3)]),
      cpf: new FormControl('', [Validators.required, Validators.min(11)]),
      phone: new FormControl('', [Validators.required, Validators.min(11)]),
      emailSignUp: new FormControl('', [Validators.required, Validators.email]),
      passwordSignUp: new FormControl('', [Validators.required, Validators.min(2)]),
    })
  }

  showForm(){
    if(this.isLogin){
      this.isLogin = false
    }
    else{
      this.isLogin = true
    }
  }

  // Validações signin

  get emailSignIn(){
    return this.signInForm.get('emailSignIn')!;
  }
  get passwordSignIn(){
    return this.signInForm.get('passwordSignIn')!;
  }

  // validações signup

  get name(){
    return this.signUpForm.get('name')!;
  }
  get cpf(){
    return this.signUpForm.get('cpf')!;
  }
  get phone(){
    return this.signUpForm.get('phone')!;
  }
  get emailSignUp(){
    return this.signUpForm.get('emailSignUp')!;
  }
  get passwordSignUp(){
    return this.signUpForm.get('passwordSignUp')!;
  }


  cancel(): void {
    this.dialogRef.close();
  }

  async submit(){

    const {value, valid} = this.signInForm;

    if( !valid ){
      return
    }
    else{
      this.signInData.email = value.emailSignIn
      this.signInData.password = value.passwordSignIn
      await this.userService.signIn(this.signInData).subscribe((data) => {
        console.log(`dados enviados!`);
        localStorage.setItem('login', JSON.stringify(data))
        this.cancel()
      },
      (err) => {
        console.log(`falha ao enviar :( ${err}`);
      })
    }
  }

  async signUp(){
    const {value, valid} = this.signUpForm;

    if( !valid ){
      return
    }else{
      this.signUpData.name = value.name;
      // this.signUpData.cpf = value.cpf;
      this.signUpData.phone = value.phone;
      this.signUpData.email = value.emailSignUp;
      this.signUpData.password = value.passwordSignUp;

      await this.userService.signUp(this.signUpData).subscribe((data) => {
        console.log(`cadastro feito com sucesso!!`);
        localStorage.setItem('login', JSON.stringify(data));
        this.cancel();
      },
      (err) => {
        console.log(`falha ao enviar :( ${err}`);

      })
    }
  }


}
