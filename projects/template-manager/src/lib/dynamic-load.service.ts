import { Inject, Injectable, Type } from '@angular/core';

import { WcmData } from './dynamic-load.types';
import { DYNAMIC_COMPONENTS } from './dynamic-load.conf';

/* tslint:disable no-string-literal */

@Injectable({
  providedIn: 'root',
})
export class DynamicLoadService {
  private components: Type<any>[] = [];

  constructor(
    @Inject(DYNAMIC_COMPONENTS) components: Type<any>[][]) {
      this.components = components.reduce((acc, curr) => [
        ...acc,
        ...curr,
      ], []);
    }

  public getViewComponents(): Type<any>[] {
    return this.components.filter((comp: Type<any>) => {
      return comp && comp['selectComponent'] && comp['selectComponent'].type === 'view' ? true : false;
    });
  }

  public getPartialComponents(): Type<any>[] {
    return this.components.filter((comp: Type<any>) => {
      return comp && comp['selectComponent'] && comp['selectComponent'].type === 'partial' ? true : false;
    });
  }

  public getContentComponents(): Type<any>[] {
    return this.components.filter((comp: Type<any>) => {
      return comp && comp['selectComponent'] && comp['selectComponent'].type === 'content' ? true : false;
    });
  }

  public selectComponent(type: string, data: WcmData): Type<any> {
    switch (type) {
      case 'view':
        return this._findComponent(this.getViewComponents(), data, ['viewReference', 'viewType', 'contentType', 'fallback']);
      case 'partial':
        return this._findComponent(this.getPartialComponents(), data, ['safeLabel', 'meta.contentType', 'fallback']);
      case 'content':
        return this._findComponent(this.getContentComponents(), data, ['slug', 'safeLabel', 'meta.contentType', 'fallback']);
      default:
        console.log('Please provide the type attribute to let the module know to load a view, partial or content');
        return null;
    }
  }

  private _findComponent(availableComponents: Type<any>[], data: WcmData, checks: string[]): Type<any> {
    return availableComponents.find((comp: Type<any>) => !!checks.find((check: string) => {
      if (!comp['selectComponent']) {
        return false;
      }

      switch (check) {
        case 'viewReference':
          return data && comp['selectComponent'].viewReference === data.viewReference;
        case 'viewType':
          return data && comp['selectComponent'].viewType === data.viewType;
        case 'contentType':
          return data && comp['selectComponent'].contentType === data.contentType;
        case 'meta.contentType':
          return data && data.meta && comp['selectComponent'].contentType === data.meta.contentType;
        case 'safeLabel':
          return data && data.meta && comp['selectComponent'].safeLabel === data.meta.safeLabel;
        case 'slug':
          return data && data.meta && comp['selectComponent'].slug === data.meta.slug;
        case 'fallback':
        default:
          return !!comp['selectComponent'].fallback;
      }
    }));
  }
}
