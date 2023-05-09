import { SurveyService } from './../../../../../core/services/survey.service';
import { Component, Inject, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'app-add-poll',
    templateUrl: './add-poll.component.html',
  })
  export class AddPollComponent {
    constructor(private surveyService: SurveyService,
      public toast: ToastrService,) {}


    addPollForm = new FormGroup({
      question: new FormControl(),
      option: new FormArray([
        new FormGroup({
            value: new FormControl(),
        })
      ]),
      dueDate : new FormControl(),
    })

    get option(): FormArray {
        return this.addPollForm.get('option') as FormArray;
    }

    onSubmit(form: FormGroup) {
        const due: Date = new Date(form.value.dueDate);
        const data = {question: form.value.question, options: form.value.option,
            dueDate: due}
        return this.surveyService.createSurvey(data).
        subscribe((res:any) => {
          this.toast.success('Poll created successfully');
        })
        
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