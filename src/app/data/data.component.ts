import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpServiceService} from '../services/http-service.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  messages: any[];
  titles: string[];

  constructor(private router: Router, private httpService: HttpServiceService) { }

  ngOnInit() {
    this.messages = JSON.parse(localStorage.getItem('MESSAGES'));
    this.titles = ['Name', 'Message', 'Score'];
  }

  goToActions() {
    this.router.navigate(['/actions']);
  }

  syncData() {
    this.httpService.syncData(this.messages).subscribe(
      response => {},
      error => {}
    );
  }
}
