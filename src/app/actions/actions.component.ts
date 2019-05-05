import {Component, OnInit, Renderer2} from '@angular/core';
import {forEach} from '@angular/router/src/utils/collection';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  messageForm: FormGroup;
  scoreValue: string;

  constructor(private router: Router, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.messageForm = new FormGroup({
      name: new FormControl('', Validators.required),
      score: new FormControl('50'),
      message: new FormControl('', Validators.required)
    });

    this.scoreValue = '50';
  }

  onSubmit() {
    const namePerson = this.messageForm.value.name;
    const data = [{message: this.messageForm.value.message, score: this.messageForm.value.score}];
    const messages = JSON.parse(localStorage.getItem('MESSAGES'));

    this.setDataToLocalStorage(messages, namePerson, data);
  }

  setDataToLocalStorage(messages: any[], name: string, data: any[]) {
    if (messages === null) {
      messages = new Array();
      this.createNewPerson(name, data, messages);
    } else {
      const existedPerson = messages.find(elem => elem.name === name);
      if (existedPerson) {
        const existedPersonData = existedPerson.data;
        existedPersonData.push(data[0]);
      } else {
        this.createNewPerson(name, data, messages);
      }
    }
    localStorage.setItem('MESSAGES', JSON.stringify(messages));

    const r = this.messageForm.controls;
    /*forEach(r, (value, key) => {
      if (key === 'score') {
        value.setValue('50');
      } else {
        value.setValue('');
      }
    });*/
    this.scoreValue = '50';
    this.messageForm.get('score').setValue(50);
    this.renderer.selectRootElement('#ageOutputId').innerText = 50;
  }

  private createNewPerson(name: string, data: any[], messages: any[]) {
    const person = {
      name,
      data
    };
    messages.push(person);
  }

  goToData() {
    this.router.navigate(['/data']);
  }
}
