import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  id: string = '';


  constructor(
    public router: Router
  ){}

  ngOnInit(): void {
    this.getLocalStorage()
  }

  getLocalStorage(){
    let data: string | null = localStorage.getItem('login')
    console.log(`DATA: ${data}`);

    let login = data ? JSON.parse(data) : null;
    this.id = login.user.id
    console.log(`LOGIN: ${login}`);
  }

  goTo(route: string){
    this.router.navigate([`/${route}/${this.id}`])
  }
}
