import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ContentService } from './content.service';

@Injectable()
export class ContentResolver implements Resolve<any[]> {
    constructor(
        private contentService: ContentService
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any[]> {
        return this.contentService.getContent(
            route.params['lang'],
            route.params['contentType'],
            route.params['content']
        );
    }
}
