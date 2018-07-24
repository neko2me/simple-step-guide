import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {SimpleStepGuideModule} from "../../projects/simple-step-guide/src/lib/simple-step-guide.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SimpleStepGuideModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
