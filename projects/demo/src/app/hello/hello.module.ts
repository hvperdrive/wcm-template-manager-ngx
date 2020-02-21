import { NgModule } from '@angular/core';

import { DynamicLoadModule } from 'template-manager';

import { SharedModule } from '../shared.module';

import { HelloComponent } from './hello.component';

@NgModule({
  imports: [
    SharedModule,
    DynamicLoadModule.forChild([
      HelloComponent,
    ]),
  ],
  declarations: [
    HelloComponent,
  ],
  exports: [
    HelloComponent,
  ],
})
export class HelloModule {}
