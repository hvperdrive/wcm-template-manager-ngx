import { Inject, Injectable, Type } from '@angular/core';

import { DynamicComponent, WcmData } from './dynamic-load.types';
import { DYNAMIC_COMPONENTS } from './dynamic-load.conf';

/* tslint:disable no-string-literal */

@Injectable({
  providedIn: 'root',
})
export class DynamicLoadService {
  constructor(
    @Inject(DYNAMIC_COMPONENTS) private components: Type<DynamicComponent>[]) {}

  public getViewComponents(): Type<DynamicComponent>[] {
    return this.components.filter((comp: Type<DynamicComponent>) => {
      return comp && comp['selectComponent'] && comp['selectComponent'].type === 'view' ? true : false;
    });
  }

  public getPartialComponents(): Type<DynamicComponent>[] {
    return this.components.filter((comp: Type<DynamicComponent>) => {
      return comp && comp['selectComponent'] && comp['selectComponent'].type === 'partial' ? true : false;
    });
  }

  public getContentComponents(): Type<DynamicComponent>[] {
    return this.components.filter((comp: Type<DynamicComponent>) => {
      return comp && comp['selectComponent'] && comp['selectComponent'].type === 'content' ? true : false;
    });
  }

  public selectComponent(type: string, data: WcmData): Type<DynamicComponent> {
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

  private _findComponent(availableComponents: Type<DynamicComponent>[], data: WcmData, checks: string[]): Type<DynamicComponent> {
    return availableComponents.find((comp: Type<DynamicComponent>) => !!checks.find((check: string) => {
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
          return data && comp['selectComponent'].slug === data.slug;
        case 'fallback':
        default:
          return !!comp['selectComponent'].fallback;
      }
    }));
  }
}
