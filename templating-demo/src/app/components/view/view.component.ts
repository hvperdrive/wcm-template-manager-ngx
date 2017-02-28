import { Component, Input, OnInit } from '@angular/core';
import { Dynamic } from '../../dynamic/dynamic';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html'
})
export class ViewComponent implements OnInit {
    static selectComponent: Dynamic = {
        selector: 'view'
    };
    @Input()
    data: any;

    ngOnInit() {}
}
