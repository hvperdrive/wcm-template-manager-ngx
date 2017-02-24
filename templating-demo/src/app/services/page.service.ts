import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PageService {
    constructor(
        private http: Http
    ) {}

    getContent(lang, page): Observable<any> {
        const url = `http://localhost:4000/api/1.0.0/pages/${page}/translated?lang=${lang}`;

        return this.http.get(url).map((res) => res.json());
    }
}
