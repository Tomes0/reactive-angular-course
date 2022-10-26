import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { LoadingService } from "../loading/loading.service";
import { MessagesService } from "../messages/messages.service";
import { Course, sortCoursesBySeqNo } from "../model/course";

@Injectable({
  providedIn: 'root'
})
export class CoursesStore{

  private subject = new BehaviorSubject<Course[]>([]);
  courses$: Observable<Course[]> = this.subject;

  constructor(
    private http: HttpClient,
    private loading: LoadingService,
    private messages: MessagesService){

    this.loadAllCourses();
  }

  private loadAllCourses(){
    const loadCourses$ = this.http.get<Course[]>('/api/courses').pipe(
      map(response => response["payload"]),
      catchError(err => {
        const messages = "Could not load courses";
        this.messages.showErrors(messages);
        console.log(messages, err);
        return throwError(err);
      }),
      tap(courses => this.subject.next(courses))
    );

    this.loading.showLoaderUntilCompleted(loadCourses$).subscribe();

  }

  filterByCategory(category: string): Observable<Course[]>{
    return this.courses$.pipe(
      map(courses => courses.filter(course => course.category == category).sort(sortCoursesBySeqNo)
      )
    )
  }


}
