# WCM Templates Module [ng4]

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
### Install through npm
You can install the module through npm the following way:

```
npm install git+ssh://git@github.com/hvperdrive/wcm-template-manager-ngx.git#v4.0.0 --save
```

Note that the version number should correspond with the version you would like to use. If you're not sure, just use [the latest version](https://github.com/hvperdrive/wcm-template-manager-ngx/releases).

### Add to your project
In your `app.module` file, import the components you want to be able to load dynamically. Next create an array to store them in, this is more convenient since you need to add them in two places.

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

Don't forget to add the array to your declarations as well.

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
You can use this module in two different ways, one is through routing, the other is directly in a component's template.

### Through routing
If you want to use the module this way there are a few things you are going to need to setup to make it work.

First create a service to get the data and a resolver to resolve it to the route.

> An example of a service for retrieving the content:

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

    getContentBySlug(lang, content): Observable<any> {
        const url = `http://localhost:4000/api/1.0.0/content?slug=${content}&lang=${lang}&populate=true`;
        return this.http.get(url).map((res) => res.json());
    }

    getContentByUUID(lang, content): Observable<any> {
        const url = `http://localhost:4000/api/1.0.0/content?uuid=${content}&lang=${lang}&populate=true`;
        return this.http.get(url).map((res) => res.json());
    }
}

```

> The resolver:

```javascript
import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ContentService } from './content.service';

@Injectable()
export class ContentResolver implements Resolve<any[]> {
    constructor(
        private contentService: ContentService
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any[]> {
		return this.contentService.getContentBySlug(
			route.params['lang'],
			route.params['content']
		);
    }
}
```

Next, we need a component to point the route towards and which will push the data into this module's `app-dynamic-load` component.

> This component can look like this:

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
> For example:

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

**Don't forget** to import the RouterModule and the new DataComponent, as well as import the service and resolver and adding both to your module's providers.

### As a component in your component
This method can be used if your want to, for example, get a view's component into your current component.

Let's say we have a homepage with the `last_three_blogposts` view in it, you already have the data so you can dynamically load the correct component in the following way:

```html
<!-- The 'dynamic-load' component can also be used to render views dynamically -->
<app-dynamic-load [componentData]="data.viewsContent.last_three_blogposts"></app-dynamic-load>
```

## Dynamic Components
The module needs a custom selector to be able to make a selection in the components you provide.

To be able to do this, import the type `Dynamic` from the module by adding the following to your component:

```javascript
import { Dynamic } from 'wcm-template-manager-ngx';
```

Afterworths add the selector to your component as so:

```javascript
// Add a new selector to the component using 'Dynamic'
// Make it static so it's available for our 'dynamic-load' component
static selectComponent: Dynamic = {
	// This selector will be used to cross-reference the possibilities to
	selector: 'page-blog'
};
```

In the bigger picture this would like this:

```javascript
import { Component, Input, OnInit } from '@angular/core';
// Import the Dynamic class
import { Dynamic } from 'wcm-template-manager-ngx';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html'
})
export class BlogComponent implements OnInit {
    // Add a new selector to the component using 'Dynamic'
    // Make it static so it's available for our 'dynamic-load' component
    static selectComponent: Dynamic = {
        // This selector will be used to cross-reference the possibilities to
        selector: 'page-blog'
    };

    @Input()
    data: any;

    title = 'This is the BlogComponent';

    ngOnInit() {
        ...
    }
}
```

## More information
To see a working example you can take a look at the [the demo project](https://github.com/hvperdrive/wcm-template-manager-ngx/tree/develop/templating-demo).

## Development for this module
To build a new version of this module run the following commands.

Compile the files in `src` and output them in `lib` with the following command (This will also add the required `*.metadata.json` files for compiling with AoT).

```
npm run create-lib
```

After that compile the `index` file.

```
npm run compile-index
```

Now commit and push your project to github and create a new version. (Don't forget to update the version in `package.json`)

```
git tag vX.X.X
git push --tags
```
