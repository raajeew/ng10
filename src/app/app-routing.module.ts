import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'blueprints', loadChildren: () => import('./blueprints/blueprints.module').then(m => m.BlueprintsModule) },
  { path: 'experiments', loadChildren: () => import('./experiments/experiments.module').then(m => m.ExperimentsModule) },
  { path: 'experiments/review', loadChildren: () => import('./review-experiment/review-experiment.module').then(m => m.ReviewExperimentModule) },
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: '**', loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
