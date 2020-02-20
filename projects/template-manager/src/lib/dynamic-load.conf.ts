import { InjectionToken, Type } from '@angular/core';

import { DynamicComponent } from './dynamic-load.types';

// tslint:disable-next-line max-line-length
export const DYNAMIC_COMPONENTS: InjectionToken<Type<DynamicComponent>[]> = new InjectionToken<Type<DynamicComponent>[]>('DYNAMIC_COMPONENTS');
