import { SurveyService } from '../../../../core/services/survey.service';
import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.css'],
})
export class PollsComponent implements OnInit{

  polls : Array<any> = [];
  selectedPolls: Array<any> = [];
  searchInput = '';
  today = new Date();

  constructor(private surveyService: SurveyService) {}

  ngOnInit() {
    this.surveyService.getSurveys()
    .subscribe((res: any) => {
      res.data.list.forEach((element: any) => {
        this.surveyService.getVotes(element.id)
        .subscribe((res: any) => {
          this.polls.push({id: element.id, question: element.question,
            dueDate: new Date(element.dueDate), votes: res.data.count
          });
          this.polls.sort((a, b) => {
            const da = a.dueDate;
            const db = b.dueDate;
            return db.valueOf() - da.valueOf() 
          });
          this.selectedPolls = this.polls;
        })
      });
    })
  }

  onSelected(value:string): void {
    this.selectedPolls = this.polls.filter((element: any) => {
      if(value === 'Live') {
        return element.dueDate >= this.today
      }else {
        return element.dueDate < this.today
      }
    });
  }

}