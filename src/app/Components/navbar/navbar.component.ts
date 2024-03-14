import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  clientNavbar = [
    {
      Url: '',
      Name: 'Home',
    },
    {
      Url: '',
      Name: 'Service',
    },
    {
      Url: '',
      Name: 'Resource',
    },
    {
      Url: '',
      Name: 'Checklist',
    },
    {
      Url: '',
      Name: 'User',
    }
  ];
}
