import {
  ANALYZE_FOR_ENTRY_COMPONENTS,
  ModuleWithProviders,
  NgModule,
  Type,
} from '@angular/core';

import { DynamicLoadComponent } from './dynamic-load.component';
import { DYNAMIC_COMPONENTS } from './dynamic-load.conf';
import { DynamicComponent } from './dynamic-load.types';

@NgModule({
  declarations: [
    DynamicLoadComponent,
  ],
  exports: [
    DynamicLoadComponent,
  ],
  providers: [{
    provide: DYNAMIC_COMPONENTS,
    useValue: [],
    multi: true,
  }],
})
export class DynamicLoadModule {
  public static forChild(components: Type<DynamicComponent>[]): ModuleWithProviders {
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
          multi: true,
        },
      ],
    };
  }
}
