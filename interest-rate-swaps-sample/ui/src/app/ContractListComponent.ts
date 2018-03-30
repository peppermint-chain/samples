import {Component, OnInit, OnDestroy} from '@angular/core';
import {BackendService} from './BackendService';
import {Contract} from './objects';

@Component({
  selector: 'contracts',
  templateUrl: 'templates/contracts.html'
})
export class ContractListComponent implements OnInit, OnDestroy {
  contracts: Contract[] = [];
  refreshRegId: number = -1;
  constructor(private backendService: BackendService) {}

  refreshContracts(): void {
    this.backendService.getContracts().then(contracts => this.setContractsList(contracts));
  }

  setContractsList(l: Contract[]): void {
    this.contracts = l;
  }

  ngOnInit(): void {
    this.refreshContracts();
    this.refreshRegId = this.backendService.registerListener('refresh', () => this.refreshContracts());
  }

  ngOnDestroy(): void {
    this.backendService.deregisterListener('refresh', this.refreshRegId);
  }
  navDetails(contract: Contract): void {
    const contractPath: string = contract.contractId + ':' + contract.buyerId + ':' + contract.sellerId;
    window.location.href = '/com.peppermintchain.samples.irs/#/contract/' + contractPath;
  }
}
