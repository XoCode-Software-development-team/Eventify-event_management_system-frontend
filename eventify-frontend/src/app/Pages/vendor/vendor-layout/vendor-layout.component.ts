import { Component } from '@angular/core';
import { Button } from '../vendor-add-new-service/vendor-add-new-service.component';

@Component({
  selector: 'app-vendor-layout',
  templateUrl: './vendor-layout.component.html',
  styleUrls: ['./vendor-layout.component.scss']
})
export class VendorLayoutComponent {

  navbar = [
    {
      Tag: 'All Services',
      Url: 'allServices',
    },
    {
      Tag: 'Booked Services',
      Url: 'bookedServices',
    },
    {
      Tag: 'Booking Requests',
      Url: 'bookingRequests',
    }
  ];

  icons = [
    {
      Name: 'chat_bubble_outline',
      Url: '',
    },
    {
      Name: 'notifications_none',
      Url: '',
    }
  ];

  buttonToggle: boolean = false;

  button: Button =
    {
      icon: 'add',
      text: 'Add New Services',
      url: 'addNewService',
      class: ['btn1'],
      type:'button',
      disable:false
    };
}


