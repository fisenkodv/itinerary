import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { SigninDialogComponent } from '../signin/signin-dialog.component';

@Component({
  selector: 'header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public dialog: MdDialog) { }

  public openSigninDialog() {
    const dialogRef = this.dialog.open(SigninDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      //this.selectedOption = result;
    });
  }
}
