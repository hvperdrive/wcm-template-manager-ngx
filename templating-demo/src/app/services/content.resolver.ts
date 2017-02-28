import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ContentService } from './content.service';

@Injectable()
export class ContentResolver implements Resolve<any[]> {
    // The ContentResolver is used in the routing, to resolve the data fron the ContentService
    constructor(
        private contentService: ContentService
    ) {}

    resolve(
        // route & state are needed to get the language, contentType and content from the route
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any[]> {
        // Once the parameters are fetched, we use contentService.getContent() to get retrieve the correct content for this route
        return this.contentService.getContent(
            route.params['lang'],
            route.params['contentType'],
            route.params['content']
        );
    }
}
