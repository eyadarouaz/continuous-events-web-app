import { Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatCalendar, MatCalendarCellClassFunction, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { EventService } from 'src/app/core/services/event.service';
import { Events } from 'src/app/core/models/event.interface';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventsComponent implements OnInit{
    constructor(private eventService: EventService,
      public renderer2: Renderer2, private router: Router,) {
      
    }
    selected: Date | null = new Date();
    datesToBeHighlighted: Array<any> = [];
    events : Array<any> = [];
    hours = Array.from(Array(23).keys()).map(x => x + 1);
    searchInput: string = '';
    programmingLanguages = [
      'Python','TypeScript','C','C++','Java',
      'Go','JavaScript','PHP','Ruby','Swift','Kotlin'
   ]
    // @ViewChild(MatCalendar) calendar?: MatCalendar<Date> ;

    ngOnInit() {
      this.eventService.getEvents()
      .subscribe((res: any) => {
        res.data.list.forEach((element: any) => {
          let pic = 'assets/images/default-event.jpg'
            if (element.image) {
              pic = `http://localhost:3000/event/${element.id}/image`;
            }
          this.datesToBeHighlighted.push(new Date(element.startDate))
          this.events.push({id: element.id, title: element.title, image: pic,
            description: element.description, location: element.location,
            status: element.status, date: new Date(element.startDate).toDateString(),
            time: new Date(element.startDate).toTimeString().slice(0,5)
          });
        });
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
      })
    }

    getDates() {
      return this.eventService.getEvents().toPromise()
      .then((res:any) => {
        return this.datesToBeHighlighted = res.data.list.map((element: any) => {
          return element.startDate
        })
      })
    }

    dateClass: MatCalendarCellClassFunction<Date> = (date: Date) => {
      return ''
    }
}