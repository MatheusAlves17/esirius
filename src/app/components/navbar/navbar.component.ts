import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { AuthComponent } from '../auth/auth.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  user!: any;
  isAuthenticate: boolean = false;
  avatarDefault: string = '';


  constructor(
    public dialog: MatDialog,
    public router: Router
    // public dialogRef: MatDialogRef<AuthComponent>,
    ){}

    ngOnInit(){
      this.getLocalStorage();
    }

  authenticate(): void {
    const dialogRef = this.dialog.open(AuthComponent, {
      minWidth: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      // this.cancel()
    });
  }

  // cancel(): void {
  //   this.dialogRef.close();
  // }

  getLocalStorage(){
    let storage: string | null = localStorage.getItem('login')

    let userStorage = storage ? JSON.parse(storage) : null

    this.user = userStorage ? userStorage.user : null

    this.user ? this.isAuthenticate = true : this.isAuthenticate = false

    if(this.user){
      this.avatarDefault = this.user.name[0]

    }
  }

  logout(){
    localStorage.removeItem('login')
    this.router.navigate(['/'])
  }

}
