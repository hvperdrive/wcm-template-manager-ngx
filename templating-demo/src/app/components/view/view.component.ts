import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html'
})
export class ViewComponent implements OnInit {
    @Input()
    data: any;

    ngOnInit() {}
}
