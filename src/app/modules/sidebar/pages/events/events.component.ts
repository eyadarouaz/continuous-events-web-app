import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { EventService } from './../../../../core/services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventsComponent implements OnInit{

  selectedEvents: Array<any> = [];
  selected: Date | null = new Date();
  datesToBeHighlighted: Array<any> = [];
  events : Array<any> = [];
  hours = Array.from(Array(23).keys()).map(x => x + 1);
  searchInput = '';

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getEvents()
    .subscribe((res: any) => {
      res.data.list.forEach((element: any) => {
        let pic = 'assets/images/default-event.jpg'
        if (element.image) pic = `http://localhost:3000/event/${element.id}/image`;
        this.datesToBeHighlighted.push(new Date(element.startDate));
        this.events.push({id: element.id, title: element.title, image: pic,
          description: element.description, location: element.location,
          status: element.status,startDate: element.startDate ,date: new Date(element.startDate).toDateString(),
          time: new Date(element.startDate).toTimeString().slice(0,5)
        });
      });

      this.events.sort((a, b) => {
        const da = new Date(a.startDate);
        const db = new Date(b.startDate);
        return db.valueOf() - da.valueOf() 
      });

      this.selectedEvents = this.events;
      this.dateClass = (date: Date) => {
        const highlightDates = this.datesToBeHighlighted
        .some(
          (d: Date) =>
            d.getDate() === date.getDate() &&
            d.getMonth() === date.getMonth() &&
            d.getFullYear() === date.getFullYear()
        );
        return highlightDates ? 'special-date' : ''
      }
    });
  }

  getDates() {
    return this.eventService.getEvents()
    .subscribe((res:any) => {
      return this.datesToBeHighlighted = res.data.list.map((element: any) => {
        return element.startDate
      });
    });
  }

  onSelected(value:string): void {
    this.selectedEvents = this.events.filter(element => {
      if(value === 'All') {
        return element
      }else {
        return element.status === value
      }
    });
  }

  dateClass: MatCalendarCellClassFunction<Date> = () => {
    return ''
  }
  
}