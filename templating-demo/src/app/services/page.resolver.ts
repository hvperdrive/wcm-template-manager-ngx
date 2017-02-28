import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PageService } from './page.service';

@Injectable()
export class PageResolver implements Resolve<any[]> {
    // The PageResolver is used in the routing, to resolve the data fron the PageService
    constructor(
        private pageService: PageService
    ) {}

    resolve(
        // route & state are needed to get the language and page from the route
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any[]> {
        // Once the parameters are fetched, we use pageContent.getContent() to get retrieve the correct content for this route
        return this.pageService.getContent(
            route.params['lang'],
            route.params['page']
        );
    }
}
