import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../common/data.service';
import { UtilitiesService } from '../common/utilities.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-blueprints',
  templateUrl: './blueprints.component.html',
  styleUrls: ['./blueprints.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class BlueprintsComponent implements OnInit {
  showLoading:boolean=false;
  dataSource = [{"id":"1","name":"ACME Blueprint Jul","appName":"App 1, App 2","metrics":["Latency","Cost"],"symbol":"ss","creationDate":1594919970000,"description":"Grafana Application to find optimal configuration through Latency(Min), Cost(Max)"},{"id":"2","name":"HV Postgress Blueprint Jul","appName":"App 1, App 2","metrics":["Latency","Cost"],"symbol":"ss","creationDate":1594010980000,"description":"Postgress Application to find optimal configuration through Latency(Min), Cost(Max)"},{"id":"3","name":"ACME Blueprint Jun","appName":"App 1, App 2","metrics":["Latency","Cost"],"symbol":"ss","creationDate":1594010980000,"description":"Elastic Application to find optimal configuration through Latency(Min), Cost(Max)"}];
  //dataSource = [];
  columnsToDisplay = ['cursor','name', 'appName', 'metrics', 'creationDate', 'actions'];
  expandedElement: [] | null;
  nodata:boolean = false;
  slideMode:any = "over";
  panelOpened:Boolean=false;
  selectedBlueprint:any={};

  @ViewChild('sidenav',{static: true}) sidenav: MatSidenav;
  constructor(public dialog: MatDialog, private router: Router,private ds: DataService,private utilityService: UtilitiesService) { }

  experiments:any=[];
  ngOnInit() {
    this.nodata = (this.dataSource.length < 1) ? true : false;
  }
  showBlueprintDetails(obj:any, event:Event){
    event.stopPropagation();
    this.selectedBlueprint = obj;
    this.sidenav.toggle();
  }
  sidenavClosed(){
    //$('body').toggleClass("modelDialogOpened");
  }
  sidenavOpened(){
   // $('body').toggleClass("modelDialogOpened");
  }
  closePanel(){
    this.sidenav.toggle();
    this.panelOpened = false;
  }

  loadBlueprints(){
    this.showLoading = true;
    this.ds.getAppList().subscribe(
      (res:any)=>{
        this.experiments = res.experiments;
        this.showLoading = false;
      },
      (error) => {
        this.showLoading = false;
        this.utilityService.openSnackBar('Something went wrong!', '', 'error');
      }
    )
  }

  createBlueprint(){
    let dialogData:any={
      title:'Create Blueprint'
    }
    this.openDialog(dialogData);
  }

  editBlueprint(obj:any){
    let dialogData:any={
      title:'Edit Blueprint',
      data:obj
    }
    this.openDialog(dialogData);
  }

  stopEventPropagation(event:Event){
    event.stopImmediatePropagation();
  }


  openDialog(dialogData:any) {
    
    const dialogRef = this.dialog.open(FullScreenDialogBlueprint,{
      disableClose:true, height: '100%', width:'100%', maxWidth:'100vw',
      data:dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'FullScreenDialogBlueprint',
  styleUrls: ['full-screen-dialog/full-screen-dialog.css'],
  templateUrl: 'full-screen-dialog/full-screen-dialog.html',
})
export class FullScreenDialogBlueprint {
  
  dialogData:any={};
  constructor(public dialogRef: MatDialogRef<FullScreenDialogBlueprint>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    // Update view with given values
     this.dialogData = this.data;
  }
}

