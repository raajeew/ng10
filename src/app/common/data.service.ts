import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable} from 'rxjs';
import { map} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(private http: HttpClient, private router: Router) { }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }
  getData(url) {
    return this.http.get(url);
  }
  getDataAll(endpoint): Observable<any> {
    return this.http.get(endpoint).pipe(map(this.extractData));
  }

  postDataService(url, body): Observable<any> {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post(url, body, httpOptions).pipe(map(this.extractData));
  }

  getAppList(): Observable<any> {   
    return this.http.get('/api/experiments');
  }

}
