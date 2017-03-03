import { Component, OnInit, Input } from '@angular/core';
// Import the Dynamic class
import { Dynamic } from 'wcm-template-manager-ng2';

@Component({
  selector: 'app-blog',
  templateUrl: './faq.component.html'
})
export class FAQComponent implements OnInit {
    // Add a new selector to the component using 'Dynamic'
    // Make it static so it's available for our 'dynamic-load' component
    static selectComponent: Dynamic = {
        // This selector will be used to cross-reference the possibilities to
        selector: 'page-faq'
    };
    @Input()
    data: any;

    ngOnInit() {}
}
