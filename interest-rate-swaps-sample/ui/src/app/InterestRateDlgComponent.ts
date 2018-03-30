import {Component, Inject} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {InterestRate} from './objects';
import {BackendService} from './BackendService';

@Component({
  selector: 'int-rate-dialog',
  templateUrl: 'templates/int-rate-dialog.html'
})
export class InterestRateDlgComponent {
  interestRate: InterestRate = null;
  dataChannel: any = null;
  showProgress = false;
  errorDescription = null;
  constructor(private backendService: BackendService, @Inject(MD_DIALOG_DATA) public data: any) {
    this.interestRate = data.rate;
    this.dataChannel = data;
  }

  addInterestRate(): void {
    this.addNewRate(this.interestRate);
  }

  addNewRate(o: InterestRate) {
    this.showProgress = true;
    this.backendService.addNewRate(o).then((o2: any) => {
      this.showProgress = false;
      const resp: any = o2.json();
      if (resp.status === 'error') {
        const msg: string = resp.errorMessage;
        this.errorDescription = msg.substr(msg.indexOf('->') + 2);
      } else {
        this.dataChannel.dialogRef.close(true);
        this.backendService.fireEvent('refreshAll');
      }
    });
  }

}
