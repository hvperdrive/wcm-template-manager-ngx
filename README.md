# WCM Templates Module [ng2]

## What does this module do?
This module makes it possible to load components dynamically based on the content provided. It does so without creating complications for AoT.

Let's say you have the following file components.

```
	app
		components
			...
			blog-view
				blog-view.component.ts
				blog-view.component.html
			faq-view
				faq-view.component.ts
				faq-view.component.html
			view
				view.component.ts
				view.component.html
			...
```

Let's say you need the blog view. This module will look for the `blog-view.component`, if it isn't found it will look for the `view.component`.

## Setup
### Add to your project
In your `app.module` file, import the components you want to be able to load dynamically. Next create and array to store them in, this is more convenient since you need to add them in two places.

```javascript
import { BlogComponent } from './components/blog/blog.component';
import { BlogpostComponent } from './components/blogpost/blogpost.component';
import { FAQComponent } from './components/faq/faq.component';
import { BlogViewComponent } from './components/blog-view/blog-view.component';
import { FAQViewComponent } from './components/faq-view/faq-view.component';
import { ViewComponent } from './components/view/view.component';

// Bundle the components in an array, just for convenience
const dynamicComponents = [
    BlogComponent,
    BlogpostComponent,
    FAQComponent,
    ViewComponent,
    BlogViewComponent,
    FAQViewComponent
];
```

Next add the `DynamicLoadModule` to your module and pass the array into it.

Also add the array to your declarations.

```javascript
@ngModule({
	imports: [
		DynamicLoadModule.forRoot(dynamicComponents),
		...
	],
	declarations: [
        AppComponent,
        DataComponent,
        // Also add the components to the declarations
        ...dynamicComponents
    ],
    ...
})
```

## Use
You can use this module in two different ways one is through routing, the other is directly in a component's template.

### Through routing
If you want to use the module this way there are a few things you are going to need to make it work.

First create a service to get the data and a resolver to resolve it to the route.

An example of a service for retrieving the content:

```javascript
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ContentService {
    constructor(
        private http: Http
    ) {}

    getContent(lang, contentType, content): Observable<any> {
        const url = `http://localhost:4000/api/1.0.0/content/${content}/translated?lang=${lang}`;

        return this.http.get(url).map((res) => res.json());
    }
}
```

The resolver:

```javascript
import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ContentService } from './content.service';

@Injectable()
export class ContentResolver implements Resolve<any[]> {
    // The ContentResolver is used in the routing, to resolve the data fron the ContentService
    constructor(
        private contentService: ContentService
    ) {}

    resolve(
        // route & state are needed to get the language, contentType and content from the route
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any[]> {
        // Once the parameters are fetched, we use contentService.getContent() to get retrieve the correct content for this route
        return this.contentService.getContent(
            route.params['lang'],
            route.params['contentType'],
            route.params['content']
        );
    }
}
```

Next, we need a component to point the route to and who will push the data into this module's `app-dynamic-load` component.

This component can look like this:

```javascript
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Component({
    selector: 'app-data',
    // We need this component to point the route to
    // This component will then get the resolved data and pass it to our 'dynamic-load' component
    template: '<app-dynamic-load [componentData]="data"></app-dynamic-load>',
})
export class DataComponent {
    data: any;

    constructor(private route: ActivatedRoute) {
        route.data.subscribe(
            (res: any) => {
                this.data = res.data;
            },
            (err) => {
                console.log(err);
            }
        );
    }
}
```

Finally we setup the route in our `app.module`:

```javascript
@ngModule({
	DynamicLoadModule.forRoot(dynamicComponents),
	RouterModule.forRoot([
		{
            path: ':lang/:contentType/:content',
            component: DataComponent,
            resolve: {
                data: ContentResolver
            }
        },
        ... other paths
	])
	...
})
```

Don't forget to import the RouterModule and the new DataComponent as well as import the service and resolver and adding them to your module's providers.

## As a component in your component
This method can be used if your want to, for example, get a view's component into your current component.

Let's say we have a homepage with the `last_three_blogposts` view in it, you already have the data so you can dynamically load the correct component in the following way:

```html
<!-- The 'dynamic-load' component can also be used to render views dynamically -->
<app-dynamic-load [componentData]="data.viewsContent.last_three_blogposts"></app-dynamic-load>
```