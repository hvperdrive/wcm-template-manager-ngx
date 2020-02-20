import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DynamicLoadModule } from 'template-manager';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Components, DynamicComponents } from './components/index';

@NgModule({
  declarations: [
    AppComponent,
    Components,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DynamicLoadModule.forRoot(DynamicComponents),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
