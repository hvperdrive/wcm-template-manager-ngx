import { Component, Input, OnInit } from '@angular/core';
import { Dynamic } from '../../dynamic/dynamic';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  exportAs: 'wcm-content-post'
})
export class BlogpostComponent implements OnInit {
    static selectComponent: Dynamic = {
        selector: 'content-ea536092-632f-4b49-b14e-bf91940b56ee'
    };
    @Input()
    data: any;

    ngOnInit() {}
}
