import { Component, Input, OnInit } from '@angular/core';
import { Dynamic } from '../../dynamic/dynamic';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html'
})
export class BlogComponent implements OnInit {
    static selectComponent: Dynamic = {
        selector: 'page-blog'
    };

    @Input()
    data: any;

    title = 'This is the BlogComponent';

    ngOnInit() {
        console.log(this.data);
    }
}
