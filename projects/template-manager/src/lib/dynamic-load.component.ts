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
    // The 'ViewContainerRef' has the 'createComponent()' function we need to get the Component in our DOM
    @Inject(ViewContainerRef) private vcr: ViewContainerRef,
    // The 'ComponentFactoryResolver' gets the component out of the ComponentFactory
    // This can only be done using the component's name
    @Inject(ComponentFactoryResolver) private cfr: ComponentFactoryResolver,
    // That's where our DynamicLoadService steps in
    // Thanks to the 'ENTRIES' we injected in it
    // .getComponents() now returns an array of all the components that we passed into the 'dynamic-load.module'
    private dynamicLoadService: DynamicLoadService,
    private cdr: ChangeDetectorRef,
  ) { }

  public ngOnChanges(): void {
    // First, if a component is already loaded, we keep track of it in 'this.currentComponent'
    // This way we can destroy it before loading a new one
    if (typeof this.currentComponent !== 'undefined') {
      this.currentComponent.destroy();
    }

    // Get component based on the data.
    const selectedComponent = this.dynamicLoadService.selectComponent(this.type, this.componentData);

    // After checking for a component which matches the criteria, render it
    if (selectedComponent) {
      // Based on what we retrieved in the previous step we now get the component out of the ComponentFactory
      const compFactory = this.cfr.resolveComponentFactory(selectedComponent);
      // Using the above we now use the 'ViewContainerRef' to get the Component in our DOM
      // We also store the component in our 'currentComponent' if we need to destroy it.
      this.currentComponent = this.vcr.createComponent(compFactory);
      // Lastly we pass the resolved data to the component
      this.currentComponent.instance.data = this.componentData;

      this.cdr.detectChanges();
    } else {
      console.log('there was no component found');
    }
  }

  public ngOnDestroy(): void {
    if (typeof this.currentComponent !== 'undefined') {
      this.currentComponent.destroy();
    }
  }
}
