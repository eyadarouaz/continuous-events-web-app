import { SurveyService } from './../../core/services/survey.service';
import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-poll-page',
  templateUrl: './poll-page.component.html',
  styleUrls: ['./poll-page.component.css'],
})
export class PollPageComponent implements OnInit{
    constructor(private surveyService: SurveyService,
    public route: ActivatedRoute, public toast: ToastrService,) {
        this.surveyService.hasVoted(route.snapshot.paramMap.get('id'))
        .subscribe((res: any)=> {
            if(res.data.canVote === false){
                this.votedDisabled = true;
            }
        })
    }

    ngOnInit(): void {
        this.surveyService.getSurveyById(this.route.snapshot.paramMap.get('id'))
            .subscribe((res:any)=> {
            if(res.statusCode){
                this.id = res.data.id;
                this.question = res.data.question;
                this.dueDate = new Date(res.data.dueDate);
                this.createdAt = new Date(res.data.createdAt).toLocaleDateString()
                this.surveyService.getVotes(this.id)
                .subscribe((res: any)=> {
                    this.votes = res.data.list;
                    this.votesNumber = res.data.count;
                });
                this.surveyService.getOptions(this.id)
                .subscribe((res: any)=> {
                    res.data.forEach((element: any) => {
                        this.surveyService.getVotesByOption(this.id, element.id)
                        .subscribe((res: any) => {
                            this.options.push({id: element.id, value: element.value, 
                                votes: res.data.count, 
                                percentage: this.percentage(res.data.count)
                                });
                                
                        })
                    })
                })
            }
            });
        this.role = localStorage.getItem('role');
    }

    selectedOption = ''
    
    progressValue = 70;

    votedDisabled = false;
    today = new Date();
    role: string | null = '';
    id = '';
    votes: Array<any> = [];
    options: Array<any> = [];
    votesNumber = 0;
    question = '';
    dueDate: Date = new Date();
    createdAt = '';

    percentage(count: any) {
        if(this.votesNumber > 0) {
            return (count/this.votesNumber)*100
        }else {
            return 0
        }
    }

    vote() {
        return this.surveyService.vote(new Number(this.route.snapshot.paramMap.get('id')),
         this.selectedOption)
         .subscribe((res:any)=> {
            console.log(res);
         },
         (err) => {
            this.toast.error('Selec')
         }
         );

    }

}