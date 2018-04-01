import {Component, OnInit, OnDestroy} from '@angular/core';
import {Offer} from './objects';
import {BackendService, AppState} from './BackendService';
import {OfferDlgComponent} from './OfferDlgComponent';
import {MdDatepickerModule, MdDialog, MdButtonModule} from '@angular/material';

declare function openDialog(dialogName: string): any;
declare function closeDialog(dialogName: string): any;

@Component({
  selector: 'open-offers',
  templateUrl: 'templates/open-offers.html'
})
export class OpenOffersComponent implements OnInit, OnDestroy {
  modalOffer: Offer = new Offer();
  modalAction: Function = null;
  appState: AppState;
  offers: Offer[] = null;
  refreshRegId: number = -1;
  constructor(private backendService: BackendService, private dialog: MdDialog) {}

  newTrade(): void {
    const tmpOffer: Offer = new Offer();
    tmpOffer.buyerId = '';
    tmpOffer.sellerId = '';
    tmpOffer.contractId = '0';
    tmpOffer.couponFrequency = 'Monthly';
    tmpOffer.fixedLegRate = '2.0';
    tmpOffer.floatingRateIndex = 'LIBOR';
    tmpOffer.maturityDate = new Date('2019-02-28T00:00:00.000-05:00');
    tmpOffer.startDate = new Date('2018-03-01T00:00:00.000-05:00');
    tmpOffer.proposedBy = this.appState.NodeName;
    tmpOffer.notionalAmount = '10000000';
    tmpOffer.floatingRateSpread = '0.5';
    tmpOffer.status = 'OPEN';
    this.showModal(tmpOffer);
  }


  showModal(offer: Offer): void {
    const dataChannel: any = {
      'offer': offer,
      'peers': this.appState.Peers
    };
    const dialogRef = this.dialog.open(OfferDlgComponent, {
      data: dataChannel
    });
    dataChannel.dialogRef = dialogRef;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.refreshOffers();
        this.backendService.fireEvent('refreshAll');
      }
    });
  }

  refreshOffers(): void {
    this.backendService.getOffers().then(offers => this.processOffers(offers));
  }

  processOffers(offers: Offer[]): void {
    for (const offer of offers) {
      offer.counterParty = this.getCounterParty(offer);
    }
    offers.sort((a: Offer, b: Offer): number => {
      return a.counterParty > b.counterParty ? 1 :
        (a.counterParty === b.counterParty ? 0 : -1);
    });
    this.offers = offers;
  }

  getCounterParty(offer: Offer) {
    return offer.buyerId === this.appState.NodeName ? offer.sellerId : offer.buyerId;
  }
  modalOK(): void {
    closeDialog('#newTrade');
    try {
      this.modalAction(this.modalOffer);
    } catch (e) {
      alert('Error ' + e);
    }
  }

  ngOnInit(): void {
    this.appState = this.backendService.getState();
    this.backendService.loadState();
    this.refreshOffers();
    this.refreshRegId = this.backendService.registerListener('refresh', () => this.refreshOffers());
  }

  ngOnDestroy(): void {
    this.backendService.deregisterListener('refresh', this.refreshRegId);
  }

  proposeEdits(offer: Offer): void {
    const tmpOffer: Offer = Object.assign({}, offer);
    tmpOffer.proposedBy = this.appState.NodeName;
    this.showModal(tmpOffer);
  }
  
  acceptOffer(offer: Offer): void {
    var newOffer = Object.assign({},offer);
    newOffer.proposedBy = this.appState.NodeName;
    newOffer.fixedLegRate = ""+offer.fixedLegRate;
    newOffer.floatingRateSpread = ""+newOffer.floatingRateSpread;
    var self = this;
    this.backendService.addNewOffer(newOffer).then((o2: any) => {
      self.refreshOffers();
    });
  }
}

function toTwoDigit(n: number):string {
  return n < 10 ? "0"+n : ""+n;
}

function toDateString(timeInMillis: number):string {
  var d2 = new Date(timeInMillis);
  var year = ""+d2.getFullYear();
  var month = toTwoDigit(d2.getMonth()+1);
  var date = toTwoDigit(d2.getDate());
  var hour = toTwoDigit(d2.getHours());
  var min = toTwoDigit(d2.getMinutes());
  var sec = toTwoDigit(d2.getSeconds());
  return year+"-"+month+"-"+date+"T"+hour+":"+min+":"+sec+".000Z";
}

function matches(o1: Offer, o2: Offer): boolean {
  return o1.buyerId === o2.buyerId && o1.sellerId === o2.sellerId &&
    o1.contractId === o2.contractId;
}


