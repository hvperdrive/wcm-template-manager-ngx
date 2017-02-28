import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DynamicLoadModule } from './dynamic/dynamic-load.module';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { AppComponent } from './app.component';
import { DataComponent } from './components/data/data.component';

// Import all the templates which need to be loaded dynamically. We need to make sure they are compiled in case AoT is used
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogpostComponent } from './components/blogpost/blogpost.component';
import { FAQComponent } from './components/faq/faq.component';
import { BlogViewComponent } from './components/blog-view/blog-view.component';
import { FAQViewComponent } from './components/faq-view/faq-view.component';

import { ContentService } from './services/content.service';
import { ContentResolver } from './services/content.resolver';

import { PageService } from './services/page.service';
import { PageResolver } from './services/page.resolver';

// Bundle the components in an array, just for convenience
const dynamicComponents = [
    BlogComponent,
    BlogpostComponent,
    FAQComponent,
    BlogViewComponent,
    FAQViewComponent
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        // Add the components to the module for dynamic loading
        DynamicLoadModule.forRoot(dynamicComponents),
        // In the routing, point paths which need dynamic templating to the DataComponent
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: ':lang/:page',
                component: DataComponent,
                // Make sure the data for the page is resolved and included in the route,
                // this data is needed for deciding which template to use
                resolve: {
                    data: PageResolver
                }
            },
            {
                path: ':lang/:contentType/:content',
                component: DataComponent,
                resolve: {
                    data: ContentResolver
                }
            }
        ]),
        MaterialModule.forRoot()
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        DataComponent,
        // Also add the components to the declarations
        ...dynamicComponents
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        ContentService,
        ContentResolver,
        PageService,
        PageResolver
    ]
})

export class AppModule {}
