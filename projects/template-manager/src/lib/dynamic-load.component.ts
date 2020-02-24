import {
  Component,
  ComponentFactoryResolver,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  ViewContainerRef,
  ChangeDetectorRef,
} from '@angular/core';

import { DynamicLoadService } from './dynamic-load.service';

@Component({
  selector: 'wcm-dynamic-load',
  template: '',
  styles: [':host { display: block; }']
})
export class DynamicLoadComponent implements OnChanges, OnDestroy {
  @Input() public componentData: any;
  @Input() public type: string;

  private currentComponent: any;

  constructor(
    @Inject(ViewContainerRef) private vcr: ViewContainerRef,
    @Inject(ComponentFactoryResolver) private cfr: ComponentFactoryResolver,
    private dynamicLoadService: DynamicLoadService,
    private cdr: ChangeDetectorRef,
  ) { }

  public ngOnChanges(): void {
    // First, if a component is already loaded, we keep track of it in 'this.currentComponent'
    // This way we can destroy it before loading a new one
    if (typeof this.currentComponent !== 'undefined') {
      this.currentComponent.destroy();
    }

    const selectedComponent = this.dynamicLoadService.selectComponent(this.type, this.componentData);

    if (selectedComponent) {
      const compFactory = this.cfr.resolveComponentFactory(selectedComponent);
      this.currentComponent = this.vcr.createComponent(compFactory);

      // pass the resolved data to the component
      this.currentComponent.instance.data = this.componentData;

      // trigger rerender
      this.cdr.detectChanges();
    } else {
      console.log('could not match a component');
    }
  }

  public ngOnDestroy(): void {
    if (this.currentComponent) {
      this.currentComponent.destroy();
    }
  }
}
