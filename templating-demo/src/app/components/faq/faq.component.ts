import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './faq.component.html'
})
export class FAQComponent implements OnInit {
    @Input()
    data: any;

    title = 'This is the BlogComponent';

    ngOnInit() {}
}
