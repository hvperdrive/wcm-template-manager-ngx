import { Component, Input, OnInit } from '@angular/core';
import { Dynamic } from '../../dynamic/dynamic';

@Component({
  selector: 'app-view',
  templateUrl: './blog-view.component.html'
})
export class BlogViewComponent implements OnInit {
    static selectComponent: Dynamic = {
        selector: 'view-blog'
    };
    @Input()
    data: any;

    ngOnInit() {}
}
