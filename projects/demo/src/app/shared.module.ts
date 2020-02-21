import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DynamicLoadModule } from 'template-manager';

@NgModule({
  imports: [
    CommonModule,
    DynamicLoadModule,
  ],
  exports: [
    CommonModule,
    DynamicLoadModule,
  ],
})
export class SharedModule {}
