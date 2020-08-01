import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(private snackBar: MatSnackBar,private router: Router) { }

  //Alert messages
  openSnackBar(message: string, action: string, type: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      panelClass: type
    });
  }


  navigate(page:any) {
    this.router.navigate([page]);
  }

}





