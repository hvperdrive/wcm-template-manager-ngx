import {
  ANALYZE_FOR_ENTRY_COMPONENTS,
  ModuleWithProviders,
  NgModule,
} from '@angular/core';

import { DynamicLoadComponent } from './dynamic-load.component';
import { DYNAMIC_COMPONENTS } from './dynamic-load.conf';

@NgModule({
  declarations: [
    DynamicLoadComponent,
  ],
  exports: [
    DynamicLoadComponent,
  ]
})
export class DynamicLoadModule {
  public static forRoot(components: any[]): ModuleWithProviders {
    return {
      ngModule: DynamicLoadModule,
      providers: [{
          // This first provider takes the components which are passed from the app.module
          // It then adds hem to the ComponentFactory with 'ANALYZE_FOR_ENTRY_COMPONENTS'
          // 'ANALYZE_FOR_ENTRY_COMPONENTS' is an opaqueToken which is built-into Angular2 for doing so
          provide: ANALYZE_FOR_ENTRY_COMPONENTS,
          useValue: components,
          multi: true,
        },
        {
          // The second provider creates the token 'Entries'
          // This is needed because 'ANALYZE_FOR_ENTRY_COMPONENTS' is not part of the dependency injection tree
          provide: DYNAMIC_COMPONENTS,
          useValue: components,
        },
      ],
    };
  }
}
