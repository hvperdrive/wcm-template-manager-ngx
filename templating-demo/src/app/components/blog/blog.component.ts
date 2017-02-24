import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html'
})
export class BlogComponent implements OnInit {
    @Input()
    data: any;

    title = 'This is the BlogComponent';

    ngOnInit() {}
}
