import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { Course } from './model/course';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {

    constructor() {

    }

    ngOnInit() {
    }

  logout() {

  }

}
