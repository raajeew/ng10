import { Component, OnInit, ViewChild, Inject, ViewContainerRef, ComponentFactoryResolver, Type, Injector } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BlueprintsComponent } from '../../blueprints/blueprints.component'

@Component({
    selector: 'fullscreendialog',
    styleUrls: ['./full-screen-dialog.css'],
    templateUrl: './full-screen-dialog.html',
  })
  export class FullScreenDialog {
    lazyCom: Promise<Type<BlueprintsComponent>>;
    lazyInjector: Injector;
    dialogData:any={};
    constructor(
      private viewContainerRef: ViewContainerRef, 
      private cfr: ComponentFactoryResolver,
      private injector: Injector,
      public dialogRef: MatDialogRef<FullScreenDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
      // Update view with given values
       this.dialogData = this.data;
       this.load();
    }
    close(){
      this.dialogRef.close()
    }
    async load(){

      /**
       * Lazy load the component by appending the component data to the DOM
       */
        // this.viewContainerRef.clear();
        // const {BlueprintsComponent} = await import('../../blueprints/blueprints.component');
        // this.viewContainerRef.createComponent(this.cfr.resolveComponentFactory(BlueprintsComponent));
       
      /**
       * Lazy load the component using ngComponentOutlet
       */
      
      if(!this.lazyCom){
        this.data = "Some data"
        this.lazyInjector = Injector.create({
          providers: [],
          parent: this.injector
        });
        this.lazyCom = import('../../blueprints/blueprints.component')
        .then(({BlueprintsComponent}) => BlueprintsComponent);
      }
    }
  }