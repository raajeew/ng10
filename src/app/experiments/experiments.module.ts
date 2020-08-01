import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import { ExperimentsRoutingModule } from './experiments-routing.module';
import { ExperimentsComponent } from './experiments.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import {MatDividerModule} from '@angular/material/divider';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ExperimentStatusWidgetComponent } from './experiment-status-widget/experiment-status-widget.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
@NgModule({
  declarations: [
    ExperimentsComponent,
    ExperimentStatusWidgetComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    ExperimentsRoutingModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSidenavModule,
    MatInputModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    NgxDaterangepickerMd.forRoot(),
    MatDividerModule,
  ]
})
export class ExperimentsModule { }
