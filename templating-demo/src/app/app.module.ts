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

import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogpostComponent } from './components/blogpost/blogpost.component';
import { FAQComponent } from './components/faq/faq.component';
import { ViewComponent } from './components/view/view.component';

import { ContentService } from './services/content.service';
import { ContentResolver } from './services/content.resolver';

import { PageService } from './services/page.service';
import { PageResolver } from './services/page.resolver';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        DynamicLoadModule.forRoot([
            BlogComponent,
            BlogpostComponent,
            FAQComponent,
            ViewComponent
        ]),
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
        BlogComponent,
        BlogpostComponent,
        FAQComponent,
        ViewComponent,
        DataComponent
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
