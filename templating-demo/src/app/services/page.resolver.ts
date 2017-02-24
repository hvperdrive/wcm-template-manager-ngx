import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PageService } from './page.service';

@Injectable()
export class PageResolver implements Resolve<any[]> {
    constructor(
        private pageService: PageService
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any[]> {
        return this.pageService.getContent(
            route.params['lang'],
            route.params['page']
        );
    }
}
