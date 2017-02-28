import { Component, Input, OnInit } from '@angular/core';
// Import the Dynamic class
import { Dynamic } from '../../dynamic/dynamic';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  exportAs: 'wcm-content-post'
})
export class BlogpostComponent implements OnInit {
    // Add a new selector to the component using 'Dynamic'
    // Make it static so it's available for our 'dynamic-load' component
    static selectComponent: Dynamic = {
        // This selector will be used to cross-reference the possibilities to
        selector: 'content-ea536092-632f-4b49-b14e-bf91940b56ee'
    };
    @Input()
    data: any;

    ngOnInit() {}
}
