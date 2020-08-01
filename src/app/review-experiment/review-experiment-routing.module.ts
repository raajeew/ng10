import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewExperimentComponent } from './review-experiment.component';

const routes: Routes = [{ path: '', component: ReviewExperimentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewExperimentRoutingModule { }
