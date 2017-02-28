import { Component, OnInit } from '@angular/core';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-blog',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    data: any;

    constructor(
        private pageService: PageService
    ) {}

    ngOnInit() {
        this.pageService.getContent('en', 'f555da43-c145-44f6-a65c-a2496f876533').subscribe(
            (res: any) => {
                this.data = res;
            },
            (err) => {
                console.log(err);
            }
        );
    }
}
