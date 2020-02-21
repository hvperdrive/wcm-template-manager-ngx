import { Component } from '@angular/core';

import { DynamicComponent } from 'template-manager';

@Component({
  selector: 'app-hello',
  template: `<h1>Hello {{data?.title}}!</h1>`,
})
export class HelloComponent implements DynamicComponent<{
  title: string;
}> {
  public static selectComponent = {
    type: 'content',
    slug: 'hello',
  };

  public data: { title: string; };
}
