import { Component, Input, OnInit } from '@angular/core';
// Import the Dynamic class
import { Dynamic } from '../../dynamic/dynamic';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html'
})
export class BlogComponent implements OnInit {
    // Add a new selector to the component using 'Dynamic'
    // Make it static so it's available for our 'dynamic-load' component
    static selectComponent: Dynamic = {
        // This selector will be used to cross-reference the possibilities to
        selector: 'page-blog'
    };

    @Input()
    data: any;

    title = 'This is the BlogComponent';

    ngOnInit() {}
}
