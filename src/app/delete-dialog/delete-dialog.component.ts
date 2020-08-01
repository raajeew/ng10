import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  @Input() data:any;
  @Input() width:any;
  @Output() close = new EventEmitter<String>();
  @Output() retrunValue = new EventEmitter<any>();

  dialogLeftPadding:any = 50;
  dialogWidth:any = 300;
  conditionValue:any="";
  errorMessage:any= false;
  constructor() {}

  ngOnInit(): void {
    this.dialogLeftPadding = ((screen.width/2) - (this.data.width/2))+'px';
    this.dialogWidth = this.data.width+'px';
   }

  closeMe(){
    this.close.next();
  }

  

  returnData(){
    if(this.data.condition === this.conditionValue){
      this.errorMessage = false;
      this.retrunValue.emit(true);
    }
    else{
      this.errorMessage = true;
    }
  }

}
