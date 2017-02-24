import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  exportAs: 'wcm-content-post'
})
export class BlogpostComponent implements OnInit {
    @Input()
    data: any;

    ngOnInit() {}
}
