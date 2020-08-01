import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'experiment-status-widget',
  templateUrl: './experiment-status-widget.component.html',
  styleUrls: ['./experiment-status-widget.component.css']
})
export class ExperimentStatusWidgetComponent implements OnInit {
  @Output() runNow = new EventEmitter<string>();
  @Output() reRun = new EventEmitter<string>();
  @Output() pause = new EventEmitter<string>();
  @Output() terminate = new EventEmitter<string>();

  constructor() { }

  @Input() data: any;
  
  ngOnInit(): void {}

  runNowEvent(): void {
    this.runNow.next();
  }
  reRunEvent(): void {
    this.reRun.next();
  }
  pauseEvent(): void {
    this.pause.next();
  }
  terminateEvent(): void {
    this.terminate.next();
  }
}
