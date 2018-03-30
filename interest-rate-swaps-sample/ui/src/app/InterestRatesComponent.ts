import {Component, OnInit, OnDestroy} from '@angular/core';
import {InterestRate} from './objects';
import {BackendService, AppState} from './BackendService';
import {MdDatepickerModule, MdDialog, MdButtonModule} from '@angular/material';
import {InterestRateDlgComponent} from './InterestRateDlgComponent';

declare function openDialog(dialogName: string): any;
declare function closeDialog(dialogName: string): any;


@Component({
  selector: 'irs-demo',
  templateUrl: 'templates/interest-rates-view.html',
})
export class InterestRatesComponent implements OnInit, OnDestroy {
  modalRate: InterestRate = new InterestRate();
  modalAction: Function = null;
  appState: AppState;
  knownRates: InterestRate[] = null;
  refreshRegId: number = -1;
  constructor(private backendService: BackendService, private dialog: MdDialog) {}

  refresh(): void {
    alert('Refresh called');
  }

  newRate(): void {
    const tmpRate: InterestRate = new InterestRate();
    tmpRate.indexName = 'LIBOR';
    tmpRate.period = 'Monthly';
    tmpRate.interestRate = 1.543;
    tmpRate.validForDate = new Date('10/01/2017');
    const dataChannel: any = {
      'rate': tmpRate
    };
    const dialogRef = this.dialog.open(InterestRateDlgComponent, {
      data: dataChannel
    });
    dataChannel.dialogRef = dialogRef;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.refreshRates();
      }
    });
  }

  refreshRates(): void {
    this.backendService.getInterestRateList().then(offers => this.processRates(offers));
  }

  processRates(rates: InterestRate[]): void {
    this.knownRates = rates;
  }

  modalOK(): void {
    closeDialog('#newRate');
    try {
      this.modalAction(this.modalRate);
    } catch (e) {
      alert('Error ' + e);
    }
  }

  ngOnInit(): void {
    this.appState = this.backendService.getState();
    this.backendService.loadState();
    this.refreshRates();
    this.refreshRegId = this.backendService.registerListener('refresh', () => this.refreshRates());
  }

  ngOnDestroy(): void {
    this.backendService.deregisterListener('refresh', this.refreshRegId);
  }
}



