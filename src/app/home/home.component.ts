import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../common/data.service';
import { UtilitiesService } from '../common/utilities.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showLoading:boolean=false;

  constructor(private router: Router,private ds: DataService,private utilityService: UtilitiesService) { }

  experiments:any=[];
  ngOnInit() {

  }

  reviewExperiment(name){
    this.router.navigate(['review-experiment'],{
      queryParams:{
        'expId':name
      }
    });
  }
}
