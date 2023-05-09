import { SurveyService } from './../../../../../core/services/survey.service';
import { Component, Inject, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ManagePollsComponent } from '../manage-polls.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-edit-poll',
    templateUrl: './edit-poll.component.html',
  })
  export class EditPollComponent implements OnInit{
    constructor(private surveyService: SurveyService,
      public toast: ToastrService,
      @Inject(MAT_DIALOG_DATA) public data: ManagePollsComponent) {}

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


    editPollForm = new FormGroup({
      question: new FormControl(),
      option: new FormArray([]),
      dueDate : new FormControl(),
    })


    get id() {
        return this.data.selectedId
    }

    get option(): FormArray {
        return this.editPollForm.get('option') as FormArray;
    }

    onSubmit(form: FormGroup) {
        const due: Date = new Date(form.value.dueDate);
        const data = {question: form.value.question, options: form.value.option,
            dueDate: due}
        console.log(data)
        
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