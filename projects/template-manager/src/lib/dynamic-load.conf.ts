import { InjectionToken, Type } from '@angular/core';

// tslint:disable-next-line max-line-length
export const DYNAMIC_COMPONENTS: InjectionToken<Type<any>[]> = new InjectionToken<Type<any>[]>('DYNAMIC_COMPONENTS');
