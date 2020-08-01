import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import { ReviewExperimentRoutingModule } from './review-experiment-routing.module';
import { ReviewExperimentComponent } from './review-experiment.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';


@NgModule({
  declarations: [
    ReviewExperimentComponent],
  imports: [
    CommonModule,
    ReviewExperimentRoutingModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatTableModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatSidenavModule
  ],
  entryComponents: []
})
export class ReviewExperimentModule { }
