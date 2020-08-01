import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlueprintsComponent } from './blueprints.component';

const routes: Routes = [{ path: '', component: BlueprintsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlueprintsRoutingModule { }
