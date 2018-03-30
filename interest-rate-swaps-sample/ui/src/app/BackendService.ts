import {Injectable, OnInit} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Offer, Contract, InterestRate} from './objects';
import {DBSchema, DBTable, DBColumn, TableData} from './DBState.component';

import 'rxjs/add/operator/toPromise';


const APPLICATION_TYPE_JSON = new Headers({'Content-Type': 'application/json'});


export class AppState {
  NodeName: string;
  Peers: PeerNode[];
  LastBlock: string;
  LastBlockTime: string;
  Modules: string[];
}

export class PeerNode {
  ExternalAppPort: number;
  ExternalIpAddress: string;
  ExternalNodePort: number;
  NodeName: string;
  PubKey: string;
}

export class TableChange {
  rowHash: string[];
  tableHash: string;
  tableId: string;
}
export class WriteSet {
  WriteSetHash: string;
  tableChanges: TableChange[];
}

export class Transaction {
  AsOf: Number;
  WriteSet: WriteSet;
}


@Injectable()
export class BackendService implements OnInit {
  private listeners: Map<string, Array<Function>> = new Map<string, Array<Function>>();
  appState: AppState = new AppState();
  constructor(private http: Http) {}

  getSchema(): Promise<DBSchema> {
    // return Promise.resolve(offers);
    return this.http.get('/api/getSchema')
      .toPromise()
      .then(response => response.json() as DBSchema)
      .catch(this.handleError);
  }

  getTableData(tableName: string): Promise<TableData> {
    return this.http.get('/api/getTable/' + tableName)
      .toPromise()
      .then(response => response.json().returnValue as TableData)
      .catch(this.handleError);
  }

  getInterestRateList(): Promise<InterestRate[]> {
    // return Promise.resolve(offers);
    return this.http.get('/com.peppermintchain.samples.irs/api/listInterestRates')
      .toPromise()
      .then(response => response.json() as InterestRate[])
      .catch(this.handleError);
  }

  getOffers(): Promise<Offer[]> {
    // return Promise.resolve(offers);
    return this.http.get('/com.peppermintchain.samples.irs/api/listOffers')
      .toPromise()
      .then(response => {
       var rv = response.json() as Offer[]
        for ( var i = 0; i < rv.length; i++ ) {
          const off:Offer = rv[i];
          off.maturityDate = new Date(off.maturityDate);
          off.startDate = new Date(off.startDate);
        }
        return rv; 
      })
      .catch(this.handleError);
  }

  getContracts(): Promise<Contract[]> {
    // return Promise.resolve(offers);
    return this.http.get('/com.peppermintchain.samples.irs/api/listContracts')
      .toPromise()
      .then(response => response.json() as Contract[])
      .catch(this.handleError);
  }

  getState(): AppState {
    return this.appState;
  }

  loadState(): Promise<AppState> {
    return this.http.get('/api/getState')
      .toPromise()
      .then(response => this.processStateResponse(response.json().returnValue as AppState))
      .catch(this.handleError);
  }

  loadHashData(): Promise<Transaction[]> {
    return this.http.get('/api/getLevelDBDump')
      .toPromise()
      .then(response => response.json().returnValue.Transactions as Transaction[])
      .catch(this.handleError);
  }

  getContractForPath(contractPath: string): Promise<Contract> {
    return this.http.get('/com.peppermintchain.samples.irs/api/getContractDetails/' + contractPath)
      .toPromise()
      .then(response => response.json() as Contract)
      .catch(this.handleError);
  }

  processStateResponse(appState: AppState): AppState {
    this.appState.NodeName = appState.NodeName;
    this.appState.Peers = appState.Peers;
    this.appState.Peers.sort((a: PeerNode, b: PeerNode): number => {
      if (a.NodeName > b.NodeName) {
        return 1;
      } else if (a.NodeName === b.NodeName) {
        return 0;
      } else {
        return -1;
      }
    });
    this.appState.LastBlock = appState.LastBlock;
    this.appState.LastBlockTime = appState.LastBlockTime;
    return appState;
  }

  registerListener(eventName: string, func: Function): number {
    let tmp: Array<Function> = this.listeners[eventName];
    if (tmp == null) {
      tmp = new Array<Function>();
      this.listeners[eventName] = tmp;
    }
    tmp.push(func);
    return tmp.length - 1;
  }

  deregisterListener(eventName: string, index: number): void {
    const tmp: Array<Function> = this.listeners[eventName];
    if (tmp == null) {
      return;
    }
    tmp.splice(index, 1);
  }

  fireEvent(eventName: string) {
    const tmp: Array<Function> = this.listeners[eventName];
    if (tmp != null) {
      for (const func of tmp) {
        func();
      }
    }
  }

  toOfferArray(json: any): Offer[] {
    const rv: Offer[] = json as Offer[];
    return rv;
  }

  addNewOffer(o: Offer): Promise<any> {
    //alert(o.maturityDate.toISOString()+":::  "+o.maturityDate.toJSON());
    //alert(JSON.stringify(o));
    var tmpObject: any = o;
    return this.http
      .post('/com.peppermintchain.samples.irs/api/addOffer', JSON.stringify(o), {headers: APPLICATION_TYPE_JSON})
      .toPromise()
      .catch(this.handleError);
  }

  addNewRate(ir: InterestRate): Promise<any> {
    return this.http
      .post('/com.peppermintchain.samples.irs/api/addInterestRate', JSON.stringify(ir), {headers: APPLICATION_TYPE_JSON})
      .toPromise()
      .catch(this.handleError);
  }

  checkForPayments(c: Contract): Promise<any> {
    const input: any = {
      'buyerId': c.buyerId,
      'sellerId': c.sellerId,
      'contractId': c.contractId
    };
    return this.http
      .post('/com.peppermintchain.samples.irs/api/checkForPayments', JSON.stringify(input), {headers: APPLICATION_TYPE_JSON})
      .toPromise()
      .catch(this.handleError);
  }

  getOrgName(orgId: string): string {
    return orgId === this.appState.NodeName ? 'Self' : orgId;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  ngOnInit(): void {
    this.loadState();
  }

}
