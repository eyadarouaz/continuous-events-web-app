import { Component } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { SurveyService } from './../../../../../core/services/survey.service';
import { NotificationService } from "../../../../../core/services/notification.service";

@Component({
    selector: 'app-add-poll',
    templateUrl: './add-poll.component.html',
  })
  export class AddPollComponent {

    addPollForm = new FormGroup({
      question: new FormControl('', Validators.required),
      option: new FormArray([
        new FormGroup({
            value: new FormControl(),
        })
      ]),
      dueDate : new FormControl('', Validators.required),
    });

    get option(): FormArray {
      return this.addPollForm.get('option') as FormArray;
    }

    constructor(
      private surveyService: SurveyService,
      private notificationService: NotificationService
    ) {}

    onSubmit(form: FormGroup) {
      const due: Date = new Date(form.value.dueDate);
      const data = {question: form.value.question, options: form.value.option,
          dueDate: due}
      return this.surveyService.createSurvey(data).
      subscribe(() => {
        this.notificationService.showSuccess('Poll created successfully');
      });
    }

    getError(control: string) {
      return this.addPollForm.get(control)?.hasError('required');
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