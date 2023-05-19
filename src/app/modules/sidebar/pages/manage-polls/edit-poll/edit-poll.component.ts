import { Component, Inject, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManagePollsComponent } from '../manage-polls.component';
import { SurveyService } from './../../../../../core/services/survey.service';
import { NotificationService } from "../../../../../core/services/notification.service";

@Component({
    selector: 'app-edit-poll',
    templateUrl: './edit-poll.component.html',
  })
  export class EditPollComponent implements OnInit{

    editPollForm = new FormGroup({
        question: new FormControl('', Validators.required),
        option: new FormArray([]),
        dueDate : new FormControl('', Validators.required),
    });

    get id() {
        return this.data.selectedId;
    }

    get option(): FormArray {
        return this.editPollForm.get('option') as FormArray;
    }

    constructor(private surveyService: SurveyService,
      @Inject(MAT_DIALOG_DATA) public data: ManagePollsComponent,
      private notificationService: NotificationService
    ) {}

    ngOnInit(): void {
        this.surveyService.getSurveyById(this.id)
        .subscribe((res: any) => {
            this.editPollForm.setControl('question', new FormControl(res.data.question));
            this.editPollForm.setControl('dueDate', new FormControl(res.data.dueDate.replace('Z', '')));
            res.data.options.forEach((element: any) => {
                this.option.push(
                    new FormGroup({
                        value: new FormControl(element.value),
                    })
                )
            });
        })
    }

    onSubmit(form: FormGroup) {
        const due: Date = new Date(form.value.dueDate);
        const data = {question: form.value.question, options: form.value.option,
            dueDate: due}
        this.surveyService.updateSurvey(this.id, data)
        .subscribe(() => {
            this.notificationService.showSuccess('Poll updated successfully');
        })   
    }

    getError(control: string) {
        return this.editPollForm.get(control)?.hasError('required');
    }

    addOption() {
        this.option.push(
            new FormGroup({
              value: new FormControl(''),
            })
        );
    }

    removeOption(i: number) {
        this.option.removeAt(i);
    }

}