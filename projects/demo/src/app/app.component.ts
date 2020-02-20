import { Component } from '@angular/core';
import { WcmData } from 'template-manager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public componentData: WcmData = {
    slug: 'hello',
    title: 'Bob',
  };
  public type = 'content';
}
