import { SurveyService } from '../../../../core/services/survey.service';
import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.css'],
})
export class PollsComponent implements OnInit{

  polls : Array<any> = [];

  constructor(private surveyService: SurveyService) {}

  ngOnInit() {
    this.surveyService.getSurveys()
    .subscribe((res: any) => {
      res.data.list.forEach((element: any) => {
        this.surveyService.getVotes(element.id)
        .subscribe((res: any) => {
          this.polls.push({id: element.id, question: element.question,
            dueDate: new Date(element.dueDate).toDateString(), votes: res.data.count
          });
        })
      });
      this.polls.sort((a, b) => {
        const da = new Date(a.createdAt);
        const db = new Date(b.createdAt);
        return db.valueOf() - da.valueOf() 
      });
    })
  }

}