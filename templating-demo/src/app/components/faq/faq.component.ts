import { Component, OnInit, Input } from '@angular/core';
import { Dynamic } from '../../dynamic/dynamic';

@Component({
  selector: 'app-blog',
  templateUrl: './faq.component.html'
})
export class FAQComponent implements OnInit {
    static selectComponent: Dynamic = {
        selector: 'page-faq'
    };
    @Input()
    data: any;

    ngOnInit() {}
}
