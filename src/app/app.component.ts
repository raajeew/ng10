import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Kubecost';
  year:any="";
  ngOnInit() {
    var d = new Date();
    this.year = d.getFullYear();

  }
}
