import {Component, OnInit} from '@angular/core';
import {BackendService, AppState} from './BackendService';
import {Contract} from './objects';
import {ActivatedRoute, ParamMap} from '@angular/router';
@Component({
  selector: 'contractDetail',
  templateUrl: 'templates/contract-detail.html'
})
export class ContractDetailComponent implements OnInit {
  appState: AppState;
  contract: Contract;
  contractPath: string;

  constructor(private backendService: BackendService, private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.appState = this.backendService.appState;
    this.route.params.subscribe((paramMap) => {
      this.contractPath = paramMap['id'];
      this.refresh();
    });
  }

  refresh(): void {
    this.backendService.getContractForPath(this.contractPath).then(
      (contract) => this.contract = contract
    );
  }

  checkForPayments(): void {
    this.backendService.checkForPayments(this.contract).then(() => {
      this.refresh();
    });
  }

}
