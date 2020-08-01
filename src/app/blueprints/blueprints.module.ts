import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import { BlueprintsRoutingModule } from './blueprints-routing.module';
import { BlueprintsComponent } from './blueprints.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
@NgModule({
  declarations: [
    BlueprintsComponent],
  imports: [
    CommonModule,
    BlueprintsRoutingModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSidenavModule,
    MatInputModule,
  ],
})
export class BlueprintsModule { }
