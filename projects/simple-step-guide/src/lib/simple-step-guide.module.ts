import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { SimpleStepGuideComponent } from "./simple-step-guide.component";


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SimpleStepGuideComponent],
  exports: [SimpleStepGuideComponent]
})
export class SimpleStepGuideModule { }
