import { Component, Input, OnInit } from '@angular/core';
import { Dynamic } from '../../dynamic/dynamic';

@Component({
  selector: 'app-view',
  templateUrl: './faq-view.component.html'
})
export class FAQViewComponent implements OnInit {
    static selectComponent: Dynamic = {
        selector: 'view-faq'
    };
    @Input()
    data: any;

    ngOnInit() {}
}
