import { Component } from '@angular/core';

@Component({
  selector: 'app-event-cover',
  templateUrl: './event-cover.component.html',
  styleUrls: ['./event-cover.component.scss']
})
export class EventCoverComponent {

  EventName: string = 'Music Festival';
  EventDescription: string = 'Dive deep into the pulsating heart of electronic euphoria at the Elysium Electro Fest 2024! Set against the mesmerizing backdrop of the Luminous Valley in Neon City, this three-day extravaganza promises to be a sonic journey like no other.';
  EventDate: string = '2024.08.12';
  EventTime: string = '08.30 AM';
  EventLocation: string = 'Colombo';


  viewAgenda() {
    console.log('View agenda!');

  }
  viewChecklist() {
    console.log('View checklist!');

  }

  Ecards: any[] = [1];
  Rcards: any[] = [1];


  hasEventServiceCards(): boolean {
    return this.Ecards && this.Ecards.length > 0;
  }
  hasEventResourceCards(): boolean {
    return this.Rcards && this.Rcards.length > 0;
  }
}
