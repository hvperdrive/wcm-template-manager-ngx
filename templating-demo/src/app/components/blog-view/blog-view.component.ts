import { Component, Input, OnInit } from '@angular/core';
// Import the Dynamic class
import { Dynamic } from '../../dynamic/dynamic';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html'
})
export class BlogViewComponent implements OnInit {
    // Add a new selector to the component using 'Dynamic'
    // Make it static so it's available for our 'dynamic-load' component
    static selectComponent: Dynamic = {
        // This selector will be used to cross-reference the possibilities to
        selector: 'view-blog'
    };
    @Input()
    data: any;

    ngOnInit() {}
}
