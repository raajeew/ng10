import { Component, OnInit, ViewChild, Inject, ViewContainerRef, ComponentFactoryResolver, Type, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../common/data.service';
import { UtilitiesService } from '../common/utilities.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription, Observable, timer } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FullScreenDialog } from './full-screen-dialog/full-screen-dialog.component';
import * as moment from 'moment';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.css']
})

export class ExperimentsComponent implements OnInit {
  private subscription: Subscription;
  everySecond: Observable<number> = timer(0, 3000);
  showLoading:boolean=false;
  experiments:any=[];
  dataSource = [];
  experimentHistory=[];
  //dataSource = [];
  columnsToDisplay = ['expName','trials','status', 'clusterName','creationDate','lastRunDate', 'actions'];
  experimentHistoryColumns = ['generatedDate','status','actions'];
  expandedElement: [] | null;
  nodata:boolean = false;
  slideMode:any = "over";
  panelOpened:Boolean=false;
  selectedExperiment:any={};
  autoRefresh:boolean=false;
  deleteDialog:Boolean = false;
  selectedDate: any = { start: moment().startOf('month'), end: moment().endOf('month') };
  ranges: any = {
    '1D': [moment(), moment()],
    '7D': [moment().subtract(6, 'days'), moment()],
    'Current Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    'Last 3 Months': [moment().subtract(3, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    'Last 6 Months': [moment().subtract(6, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    'Last 1 Year': [moment().subtract(12, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    'Month to date': [moment().startOf('month'), moment()],
    'Year to date': [moment().startOf('year'), moment()]
  };

  @ViewChild('sidenav',{static: true}) sidenav: MatSidenav;
  constructor(public dialog: MatDialog, private router: Router,private ds: DataService,private utilityService: UtilitiesService,
    private viewContainerRef: ViewContainerRef, 
    private cfr: ComponentFactoryResolver,
    private injector: Injector) { }
  
  ngOnInit() {
    //this.openDeleteDialog({});
    this.loadExperiments();
    if(this.autoRefresh){
      this.refreshExperimentList();
    }

    window.onscroll=()=>{
      this.stickyTopBar();
    };
  }
  onDateRangeChanged(event) {
    
  }
  toggleRefresh(){
    if(this.autoRefresh){
      this.refreshExperimentList();
    }else{
      this.pauseRefresh();
      console.log(this.autoRefresh);
    }
    
  }
  refreshExperimentList(){
    this.subscription = this.everySecond.subscribe((seconds) => {
      if(seconds > 0){
        this.loadExperiments();
      }
    })
  }

  pauseRefresh(){
    this.subscription.unsubscribe();
  }
  
  deleteDialogData:any={};
  openDeleteDialog(element:any){
    this.deleteDialogData={
      'title':'Delete Experiment',
      'message':'Permanently deleting <strong>'+element.expName+'</strong>? You <strong class="red">will not be able to recover</strong> it.',
      'condition':'delete',
      'button':'Delete Experiment',
      'width':550,
    };
    this.deleteDialog = true;
  }
  closeDeleteDialog(){
    this.deleteDialog = false;
  }
  getDeleteDialogValue(value:any){
    alert(value);
    this.closeDeleteDialog();
  }

  updateStatusEvent(type:String,ele:any){
    switch(type){
      case 'run':
        alert(ele.expName+" will "+type)
        break;
      case 'rerun':
        alert(ele.expName+" will "+type)
        break;
      case 'pause':
        alert(ele.expName+" will "+type)
        break; 
      case 'terminate':
        alert(ele.expName+" will "+type)
        break;    
    }
  }

  eventPropagationStop(event: Event){
    event.stopPropagation();
  }
  showExperimentDetails(obj:any, event: Event){
    this.showLoading = true;
    event.stopPropagation();
    this.selectedExperiment.summary = obj;
    this.ds.getData('/mockapi/getExperimentDetails').subscribe(
      (res:any)=>{
        this.showLoading = false;
        this.selectedExperiment.history = res.data;
        this.experimentHistory = res.data;
        this.sidenav.toggle();
      },
      (error:any) => {
        this.showLoading = false;
        this.utilityService.openSnackBar('Something went wrong!', '', 'error');
      }
    )
    
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

 
  activeFilter:string = "all";
  snapshotFilter:any=[
    {
      "id":"all",
      "label":"All",
      "value":0
    },
    {
      "id":"running",
      "label":"Running",
      "value":0
    },
    {
      "id":"completed",
      "label":"Completed",
      "value":0
    },
    {
      "id":"terminated",
      "label":"Terminated",
      "value":0
    }
  ];
  loadExperiments(){
    //this.snapshotFilter=[];
    this.ds.getData('/mockapi/getExperiments').subscribe(
      (res:any)=>{
        this.experiments=[];
        this.snapshotFilter = res.snapshotFilter;
        this.dataSource = res.data;
        this.nodata = (this.dataSource.length < 1) ? true : false;
        this.showLoading = false;
      },
      (error) => {
        this.showLoading = false;
        this.utilityService.openSnackBar('Something went wrong!', '', 'error');
      }
    )
  }

  trackByFn(index: number, item: any){
    return item.id;
  }

  filterExperiement(arg:any){
    this.activeFilter = arg;
  }

  reviewExperiment(name, event: Event){
    event.stopPropagation();
    this.router.navigate(['experiments/review'],{
      queryParams:{
        'id': 'my_ex'
      }
    });
  }


  createExperiment(){
    let dialogData:any={
      title:'Create Experiment'
    }
    this.openDialog(dialogData);
  }

  editExperiment(obj:any){
    let dialogData:any={
      title:'Edit Experiment',
      data:obj
    }
    this.openDialog(dialogData);
  }

  openDialog(dialogData:any) {
    const dialogRef = this.dialog.open(FullScreenDialog,{
      disableClose:false, height: '100%', width:'100%', maxWidth:'100vw',
      data:dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  stopEventPropagation(event:Event){
    event.stopImmediatePropagation();
  }

  // stckity top bar
  
  //window.onscroll = function() {myFunction()};

  

  stickyTopBar() {
    let header = document.getElementById("topBar");
   // var sticky = header.offsetTop;
    if (window.pageYOffset > 50) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  }

}


