import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { AuthComponent } from '../auth/auth.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    public dialog: MatDialog,
    // public dialogRef: MatDialogRef<AuthComponent>,
    ){}

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

}
