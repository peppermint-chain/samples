webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/BackendService.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* unused harmony export AppState */
/* unused harmony export PeerNode */
/* unused harmony export TableChange */
/* unused harmony export WriteSet */
/* unused harmony export Transaction */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackendService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var APPLICATION_TYPE_JSON = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
var AppState = (function () {
    function AppState() {
    }
    return AppState;
}());

var PeerNode = (function () {
    function PeerNode() {
    }
    return PeerNode;
}());

var TableChange = (function () {
    function TableChange() {
    }
    return TableChange;
}());

var WriteSet = (function () {
    function WriteSet() {
    }
    return WriteSet;
}());

var Transaction = (function () {
    function Transaction() {
    }
    return Transaction;
}());

var BackendService = (function () {
    function BackendService(http) {
        this.http = http;
        this.listeners = new Map();
        this.appState = new AppState();
    }
    BackendService.prototype.getSchema = function () {
        // return Promise.resolve(offers);
        return this.http.get('/api/getSchema')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    BackendService.prototype.getTableData = function (tableName) {
        return this.http.get('/api/getTable/' + tableName)
            .toPromise()
            .then(function (response) { return response.json().returnValue; })
            .catch(this.handleError);
    };
    BackendService.prototype.getInterestRateList = function () {
        // return Promise.resolve(offers);
        return this.http.get('/com.peppermintchain.samples.irs/api/listInterestRates')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    BackendService.prototype.getOffers = function () {
        // return Promise.resolve(offers);
        return this.http.get('/com.peppermintchain.samples.irs/api/listOffers')
            .toPromise()
            .then(function (response) {
            var rv = response.json();
            for (var i = 0; i < rv.length; i++) {
                var off = rv[i];
                off.maturityDate = new Date(off.maturityDate);
                off.startDate = new Date(off.startDate);
            }
            return rv;
        })
            .catch(this.handleError);
    };
    BackendService.prototype.getContracts = function () {
        // return Promise.resolve(offers);
        return this.http.get('/com.peppermintchain.samples.irs/api/listContracts')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    BackendService.prototype.getState = function () {
        return this.appState;
    };
    BackendService.prototype.loadState = function () {
        var _this = this;
        return this.http.get('/api/getState')
            .toPromise()
            .then(function (response) { return _this.processStateResponse(response.json().returnValue); })
            .catch(this.handleError);
    };
    BackendService.prototype.loadHashData = function () {
        return this.http.get('/api/getLevelDBDump')
            .toPromise()
            .then(function (response) { return response.json().returnValue.Transactions; })
            .catch(this.handleError);
    };
    BackendService.prototype.getContractForPath = function (contractPath) {
        return this.http.get('/com.peppermintchain.samples.irs/api/getContractDetails/' + contractPath)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    BackendService.prototype.processStateResponse = function (appState) {
        this.appState.NodeName = appState.NodeName;
        this.appState.Peers = appState.Peers;
        this.appState.Peers.sort(function (a, b) {
            if (a.NodeName > b.NodeName) {
                return 1;
            }
            else if (a.NodeName === b.NodeName) {
                return 0;
            }
            else {
                return -1;
            }
        });
        this.appState.LastBlock = appState.LastBlock;
        this.appState.LastBlockTime = appState.LastBlockTime;
        return appState;
    };
    BackendService.prototype.registerListener = function (eventName, func) {
        var tmp = this.listeners[eventName];
        if (tmp == null) {
            tmp = new Array();
            this.listeners[eventName] = tmp;
        }
        tmp.push(func);
        return tmp.length - 1;
    };
    BackendService.prototype.deregisterListener = function (eventName, index) {
        var tmp = this.listeners[eventName];
        if (tmp == null) {
            return;
        }
        tmp.splice(index, 1);
    };
    BackendService.prototype.fireEvent = function (eventName) {
        var tmp = this.listeners[eventName];
        if (tmp != null) {
            for (var _i = 0, tmp_1 = tmp; _i < tmp_1.length; _i++) {
                var func = tmp_1[_i];
                func();
            }
        }
    };
    BackendService.prototype.toOfferArray = function (json) {
        var rv = json;
        return rv;
    };
    BackendService.prototype.addNewOffer = function (o) {
        //alert(o.maturityDate.toISOString()+":::  "+o.maturityDate.toJSON());
        //alert(JSON.stringify(o));
        var tmpObject = o;
        return this.http
            .post('/com.peppermintchain.samples.irs/api/addOffer', JSON.stringify(o), { headers: APPLICATION_TYPE_JSON })
            .toPromise()
            .catch(this.handleError);
    };
    BackendService.prototype.addNewRate = function (ir) {
        return this.http
            .post('/com.peppermintchain.samples.irs/api/addInterestRate', JSON.stringify(ir), { headers: APPLICATION_TYPE_JSON })
            .toPromise()
            .catch(this.handleError);
    };
    BackendService.prototype.checkForPayments = function (c) {
        var input = {
            'buyerId': c.buyerId,
            'sellerId': c.sellerId,
            'contractId': c.contractId
        };
        return this.http
            .post('/com.peppermintchain.samples.irs/api/checkForPayments', JSON.stringify(input), { headers: APPLICATION_TYPE_JSON })
            .toPromise()
            .catch(this.handleError);
    };
    BackendService.prototype.getOrgName = function (orgId) {
        return orgId === this.appState.NodeName ? 'Self' : orgId;
    };
    BackendService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    BackendService.prototype.ngOnInit = function () {
        this.loadState();
    };
    return BackendService;
}());
BackendService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object])
], BackendService);

var _a;
//# sourceMappingURL=BackendService.js.map

/***/ }),

/***/ "../../../../../src/app/ContractDetailComponent.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BackendService__ = __webpack_require__("../../../../../src/app/BackendService.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContractDetailComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ContractDetailComponent = (function () {
    function ContractDetailComponent(backendService, route) {
        this.backendService = backendService;
        this.route = route;
    }
    ContractDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appState = this.backendService.appState;
        this.route.params.subscribe(function (paramMap) {
            _this.contractPath = paramMap['id'];
            _this.refresh();
        });
    };
    ContractDetailComponent.prototype.refresh = function () {
        var _this = this;
        this.backendService.getContractForPath(this.contractPath).then(function (contract) { return _this.contract = contract; });
    };
    ContractDetailComponent.prototype.checkForPayments = function () {
        var _this = this;
        this.backendService.checkForPayments(this.contract).then(function () {
            _this.refresh();
        });
    };
    return ContractDetailComponent;
}());
ContractDetailComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Component */])({
        selector: 'contractDetail',
        template: __webpack_require__("../../../../../src/app/templates/contract-detail.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__BackendService__["a" /* BackendService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__BackendService__["a" /* BackendService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */]) === "function" && _b || Object])
], ContractDetailComponent);

var _a, _b;
//# sourceMappingURL=ContractDetailComponent.js.map

/***/ }),

/***/ "../../../../../src/app/ContractListComponent.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BackendService__ = __webpack_require__("../../../../../src/app/BackendService.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContractListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContractListComponent = (function () {
    function ContractListComponent(backendService) {
        this.backendService = backendService;
        this.contracts = [];
        this.refreshRegId = -1;
    }
    ContractListComponent.prototype.refreshContracts = function () {
        var _this = this;
        this.backendService.getContracts().then(function (contracts) { return _this.setContractsList(contracts); });
    };
    ContractListComponent.prototype.setContractsList = function (l) {
        this.contracts = l;
    };
    ContractListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.refreshContracts();
        this.refreshRegId = this.backendService.registerListener('refresh', function () { return _this.refreshContracts(); });
    };
    ContractListComponent.prototype.ngOnDestroy = function () {
        this.backendService.deregisterListener('refresh', this.refreshRegId);
    };
    ContractListComponent.prototype.navDetails = function (contract) {
        var contractPath = contract.contractId + ':' + contract.buyerId + ':' + contract.sellerId;
        window.location.href = '/com.peppermintchain.samples.irs/#/contract/' + contractPath;
    };
    return ContractListComponent;
}());
ContractListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Component */])({
        selector: 'contracts',
        template: __webpack_require__("../../../../../src/app/templates/contracts.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__BackendService__["a" /* BackendService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__BackendService__["a" /* BackendService */]) === "function" && _a || Object])
], ContractListComponent);

var _a;
//# sourceMappingURL=ContractListComponent.js.map

/***/ }),

/***/ "../../../../../src/app/DBState.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BackendService__ = __webpack_require__("../../../../../src/app/BackendService.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DBStateComponent; });
/* unused harmony export TableData */
/* unused harmony export DBTable */
/* unused harmony export DBColumn */
/* unused harmony export DBSchema */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DBStateComponent = (function () {
    function DBStateComponent(backendService) {
        this.backendService = backendService;
        this.name = 'DB State';
        this.selectedTableName = null;
        this.tableData = null;
    }
    DBStateComponent.prototype.refreshSchema = function () {
        var _this = this;
        this.backendService.loadState().then(function (state) {
            return _this.appState = state;
        });
        this.backendService.getSchema().then(function (schema) {
            return _this.schema = schema;
        });
    };
    DBStateComponent.prototype.ngOnInit = function () {
        this.refreshSchema();
    };
    DBStateComponent.prototype.loadData = function () {
        var _this = this;
        this.backendService.getTableData(this.selectedTableName).then(function (data) { return _this.tableData = data; });
    };
    DBStateComponent.prototype.reloadHashes = function () {
        var _this = this;
        this.backendService.loadHashData().then(function (data) {
            return _this.transactionHashData = data;
        });
    };
    DBStateComponent.prototype.jstring = function (obj) {
        if (obj == null) {
            return '';
        }
        else {
            return JSON.stringify(obj);
        }
    };
    return DBStateComponent;
}());
DBStateComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Component */])({
        selector: 'db-state',
        template: __webpack_require__("../../../../../src/app/templates/db-state.html"),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__BackendService__["a" /* BackendService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__BackendService__["a" /* BackendService */]) === "function" && _a || Object])
], DBStateComponent);

var TableData = (function () {
    function TableData() {
    }
    return TableData;
}());

var DBTable = (function () {
    function DBTable() {
    }
    return DBTable;
}());

var DBColumn = (function () {
    function DBColumn() {
    }
    return DBColumn;
}());

var DBSchema = (function () {
    function DBSchema() {
    }
    return DBSchema;
}());

var _a;
//# sourceMappingURL=DBState.component.js.map

/***/ }),

/***/ "../../../../../src/app/IRSDemo.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IRSDemoComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var IRSDemoComponent = (function () {
    function IRSDemoComponent() {
        this.name = 'Interest Rate Swap Demo';
    }
    return IRSDemoComponent;
}());
IRSDemoComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Component */])({
        selector: 'irs-demo',
        template: __webpack_require__("../../../../../src/app/templates/irs-demo.html"),
    })
], IRSDemoComponent);

//# sourceMappingURL=IRSDemo.component.js.map

/***/ }),

/***/ "../../../../../src/app/InterestRateDlgComponent.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__BackendService__ = __webpack_require__("../../../../../src/app/BackendService.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InterestRateDlgComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var InterestRateDlgComponent = (function () {
    function InterestRateDlgComponent(backendService, data) {
        this.backendService = backendService;
        this.data = data;
        this.interestRate = null;
        this.dataChannel = null;
        this.showProgress = false;
        this.errorDescription = null;
        this.interestRate = data.rate;
        this.dataChannel = data;
    }
    InterestRateDlgComponent.prototype.addInterestRate = function () {
        this.addNewRate(this.interestRate);
    };
    InterestRateDlgComponent.prototype.addNewRate = function (o) {
        var _this = this;
        this.showProgress = true;
        this.backendService.addNewRate(o).then(function (o2) {
            _this.showProgress = false;
            var resp = o2.json();
            if (resp.status === 'error') {
                var msg = resp.errorMessage;
                _this.errorDescription = msg.substr(msg.indexOf('->') + 2);
            }
            else {
                _this.dataChannel.dialogRef.close(true);
                _this.backendService.fireEvent('refreshAll');
            }
        });
    };
    return InterestRateDlgComponent;
}());
InterestRateDlgComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Component */])({
        selector: 'int-rate-dialog',
        template: __webpack_require__("../../../../../src/app/templates/int-rate-dialog.html")
    }),
    __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MD_DIALOG_DATA */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__BackendService__["a" /* BackendService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__BackendService__["a" /* BackendService */]) === "function" && _a || Object, Object])
], InterestRateDlgComponent);

var _a;
//# sourceMappingURL=InterestRateDlgComponent.js.map

/***/ }),

/***/ "../../../../../src/app/InterestRatesComponent.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__objects__ = __webpack_require__("../../../../../src/app/objects.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__BackendService__ = __webpack_require__("../../../../../src/app/BackendService.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__InterestRateDlgComponent__ = __webpack_require__("../../../../../src/app/InterestRateDlgComponent.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InterestRatesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var InterestRatesComponent = (function () {
    function InterestRatesComponent(backendService, dialog) {
        this.backendService = backendService;
        this.dialog = dialog;
        this.modalRate = new __WEBPACK_IMPORTED_MODULE_1__objects__["b" /* InterestRate */]();
        this.modalAction = null;
        this.knownRates = null;
        this.refreshRegId = -1;
    }
    InterestRatesComponent.prototype.refresh = function () {
        alert('Refresh called');
    };
    InterestRatesComponent.prototype.newRate = function () {
        var _this = this;
        var tmpRate = new __WEBPACK_IMPORTED_MODULE_1__objects__["b" /* InterestRate */]();
        tmpRate.indexName = 'LIBOR';
        tmpRate.period = 'Monthly';
        tmpRate.interestRate = 1.543;
        tmpRate.validForDate = new Date('10/01/2017');
        var dataChannel = {
            'rate': tmpRate
        };
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_4__InterestRateDlgComponent__["a" /* InterestRateDlgComponent */], {
            data: dataChannel
        });
        dataChannel.dialogRef = dialogRef;
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.refreshRates();
            }
        });
    };
    InterestRatesComponent.prototype.refreshRates = function () {
        var _this = this;
        this.backendService.getInterestRateList().then(function (offers) { return _this.processRates(offers); });
    };
    InterestRatesComponent.prototype.processRates = function (rates) {
        this.knownRates = rates;
    };
    InterestRatesComponent.prototype.modalOK = function () {
        closeDialog('#newRate');
        try {
            this.modalAction(this.modalRate);
        }
        catch (e) {
            alert('Error ' + e);
        }
    };
    InterestRatesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appState = this.backendService.getState();
        this.backendService.loadState();
        this.refreshRates();
        this.refreshRegId = this.backendService.registerListener('refresh', function () { return _this.refreshRates(); });
    };
    InterestRatesComponent.prototype.ngOnDestroy = function () {
        this.backendService.deregisterListener('refresh', this.refreshRegId);
    };
    return InterestRatesComponent;
}());
InterestRatesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Component */])({
        selector: 'irs-demo',
        template: __webpack_require__("../../../../../src/app/templates/interest-rates-view.html"),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__BackendService__["a" /* BackendService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__BackendService__["a" /* BackendService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_material__["i" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_material__["i" /* MdDialog */]) === "function" && _b || Object])
], InterestRatesComponent);

var _a, _b;
//# sourceMappingURL=InterestRatesComponent.js.map

/***/ }),

/***/ "../../../../../src/app/LoginComponent.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BackendService__ = __webpack_require__("../../../../../src/app/BackendService.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoginComponent = (function () {
    function LoginComponent(backendService) {
        this.backendService = backendService;
        this.name = 'Login';
        this.userId = null;
        this.password = null;
        this.onLogin = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]();
    }
    LoginComponent.prototype.doLogin = function () {
        if (this.userId === 'thetachain' && this.password === 'thetachain') {
            setCookie('LOGIN_STATE', 'LOGIN_COMPLETE');
            this.onLogin.emit(true);
        }
    };
    return LoginComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Output */])(),
    __metadata("design:type", Object)
], LoginComponent.prototype, "onLogin", void 0);
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Component */])({
        selector: 'login',
        template: __webpack_require__("../../../../../src/app/templates/login.html"),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__BackendService__["a" /* BackendService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__BackendService__["a" /* BackendService */]) === "function" && _a || Object])
], LoginComponent);

var _a;
//# sourceMappingURL=LoginComponent.js.map

/***/ }),

/***/ "../../../../../src/app/OfferDlgComponent.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__BackendService__ = __webpack_require__("../../../../../src/app/BackendService.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OfferDlgComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var OfferDlgComponent = (function () {
    function OfferDlgComponent(backendService, data) {
        this.backendService = backendService;
        this.data = data;
        this.modalOffer = null;
        this.peers = [];
        this.showProgress = false;
        this.modalOffer = data['offer'];
        this.peers = data['peers'];
        this.dataChannel = data;
    }
    OfferDlgComponent.prototype.addNewOffer = function () {
        var _this = this;
        this.showProgress = true;
        this.backendService.addNewOffer(this.modalOffer).then(function (o2) {
            _this.dataChannel.dialogRef.close(true);
            _this.backendService.fireEvent('refreshAll');
            _this.showProgress = false;
        });
    };
    return OfferDlgComponent;
}());
OfferDlgComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Component */])({
        selector: 'offer-dialog',
        template: __webpack_require__("../../../../../src/app/templates/offer-dialog.html")
    }),
    __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MD_DIALOG_DATA */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__BackendService__["a" /* BackendService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__BackendService__["a" /* BackendService */]) === "function" && _a || Object, Object])
], OfferDlgComponent);

var _a;
//# sourceMappingURL=OfferDlgComponent.js.map

/***/ }),

/***/ "../../../../../src/app/OpenOffersComponent.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__objects__ = __webpack_require__("../../../../../src/app/objects.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__BackendService__ = __webpack_require__("../../../../../src/app/BackendService.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__OfferDlgComponent__ = __webpack_require__("../../../../../src/app/OfferDlgComponent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OpenOffersComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var OpenOffersComponent = (function () {
    function OpenOffersComponent(backendService, dialog) {
        this.backendService = backendService;
        this.dialog = dialog;
        this.modalOffer = new __WEBPACK_IMPORTED_MODULE_1__objects__["a" /* Offer */]();
        this.modalAction = null;
        this.offers = null;
        this.refreshRegId = -1;
    }
    OpenOffersComponent.prototype.newTrade = function () {
        var tmpOffer = new __WEBPACK_IMPORTED_MODULE_1__objects__["a" /* Offer */]();
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
    };
    OpenOffersComponent.prototype.showModal = function (offer) {
        var _this = this;
        var dataChannel = {
            'offer': offer,
            'peers': this.appState.Peers
        };
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_3__OfferDlgComponent__["a" /* OfferDlgComponent */], {
            data: dataChannel
        });
        dataChannel.dialogRef = dialogRef;
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.refreshOffers();
                _this.backendService.fireEvent('refreshAll');
            }
        });
    };
    OpenOffersComponent.prototype.refreshOffers = function () {
        var _this = this;
        this.backendService.getOffers().then(function (offers) { return _this.processOffers(offers); });
    };
    OpenOffersComponent.prototype.processOffers = function (offers) {
        for (var _i = 0, offers_1 = offers; _i < offers_1.length; _i++) {
            var offer = offers_1[_i];
            offer.counterParty = this.getCounterParty(offer);
        }
        offers.sort(function (a, b) {
            return a.counterParty > b.counterParty ? 1 :
                (a.counterParty === b.counterParty ? 0 : -1);
        });
        this.offers = offers;
    };
    OpenOffersComponent.prototype.getCounterParty = function (offer) {
        return offer.buyerId === this.appState.NodeName ? offer.sellerId : offer.buyerId;
    };
    OpenOffersComponent.prototype.modalOK = function () {
        closeDialog('#newTrade');
        try {
            this.modalAction(this.modalOffer);
        }
        catch (e) {
            alert('Error ' + e);
        }
    };
    OpenOffersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appState = this.backendService.getState();
        this.backendService.loadState();
        this.refreshOffers();
        this.refreshRegId = this.backendService.registerListener('refresh', function () { return _this.refreshOffers(); });
    };
    OpenOffersComponent.prototype.ngOnDestroy = function () {
        this.backendService.deregisterListener('refresh', this.refreshRegId);
    };
    OpenOffersComponent.prototype.proposeEdits = function (offer) {
        var tmpOffer = Object.assign({}, offer);
        tmpOffer.proposedBy = this.appState.NodeName;
        this.showModal(tmpOffer);
    };
    OpenOffersComponent.prototype.acceptOffer = function (offer) {
        var newOffer = Object.assign({}, offer);
        newOffer.proposedBy = this.appState.NodeName;
        newOffer.fixedLegRate = "" + offer.fixedLegRate;
        newOffer.floatingRateSpread = "" + newOffer.floatingRateSpread;
        var self = this;
        this.backendService.addNewOffer(newOffer).then(function (o2) {
            self.refreshOffers();
        });
    };
    return OpenOffersComponent;
}());
OpenOffersComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Component */])({
        selector: 'open-offers',
        template: __webpack_require__("../../../../../src/app/templates/open-offers.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__BackendService__["a" /* BackendService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__BackendService__["a" /* BackendService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__angular_material__["i" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_material__["i" /* MdDialog */]) === "function" && _b || Object])
], OpenOffersComponent);

function toTwoDigit(n) {
    return n < 10 ? "0" + n : "" + n;
}
function toDateString(timeInMillis) {
    var d2 = new Date(timeInMillis);
    var year = "" + d2.getFullYear();
    var month = toTwoDigit(d2.getMonth() + 1);
    var date = toTwoDigit(d2.getDate());
    var hour = toTwoDigit(d2.getHours());
    var min = toTwoDigit(d2.getMinutes());
    var sec = toTwoDigit(d2.getSeconds());
    return year + "-" + month + "-" + date + "T" + hour + ":" + min + ":" + sec + ".000Z";
}
function matches(o1, o2) {
    return o1.buyerId === o2.buyerId && o1.sellerId === o2.sellerId &&
        o1.contractId === o2.contractId;
}
var _a, _b;
//# sourceMappingURL=OpenOffersComponent.js.map

/***/ }),

/***/ "../../../../../src/app/SystemState.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BackendService__ = __webpack_require__("../../../../../src/app/BackendService.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SystemStateComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SystemStateComponent = (function () {
    function SystemStateComponent(backendService) {
        this.backendService = backendService;
        this.name = 'System State';
    }
    SystemStateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.backendService.loadState().then(function (state) {
            return _this.appState = state;
        });
    };
    SystemStateComponent.prototype.toJson = function (o) {
        return JSON.stringify(o);
    };
    return SystemStateComponent;
}());
SystemStateComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Component */])({
        selector: 'sys-state',
        template: __webpack_require__("../../../../../src/app/templates/sys-state.html"),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__BackendService__["a" /* BackendService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__BackendService__["a" /* BackendService */]) === "function" && _a || Object])
], SystemStateComponent);

var _a;
//# sourceMappingURL=SystemState.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BackendService__ = __webpack_require__("../../../../../src/app/BackendService.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(backendService) {
        this.backendService = backendService;
        this.title = 'Theta-Chain Demo';
        this.appState = null;
        this.loginDone = true;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.appState = this.backendService.appState;
        this.loginDone = 'LOGIN_COMPLETE' === getCookie('LOGIN_STATE');
    };
    AppComponent.prototype.onLogin = function (loginFlag) {
        this.loginDone = loginFlag;
    };
    AppComponent.prototype.refresh = function () {
        this.backendService.fireEvent('refresh');
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Component */])({
        selector: 'my-app',
        template: __webpack_require__("../../../../../src/app/templates/app.html"),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__BackendService__["a" /* BackendService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__BackendService__["a" /* BackendService */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__IRSDemo_component__ = __webpack_require__("../../../../../src/app/IRSDemo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__SystemState_component__ = __webpack_require__("../../../../../src/app/SystemState.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__DBState_component__ = __webpack_require__("../../../../../src/app/DBState.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__OpenOffersComponent__ = __webpack_require__("../../../../../src/app/OpenOffersComponent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ContractListComponent__ = __webpack_require__("../../../../../src/app/ContractListComponent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__InterestRatesComponent__ = __webpack_require__("../../../../../src/app/InterestRatesComponent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__BackendService__ = __webpack_require__("../../../../../src/app/BackendService.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ContractDetailComponent__ = __webpack_require__("../../../../../src/app/ContractDetailComponent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__InterestRateDlgComponent__ = __webpack_require__("../../../../../src/app/InterestRateDlgComponent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__OfferDlgComponent__ = __webpack_require__("../../../../../src/app/OfferDlgComponent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__LoginComponent__ = __webpack_require__("../../../../../src/app/LoginComponent.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* HttpModule */], __WEBPACK_IMPORTED_MODULE_13__angular_material__["a" /* MdDatepickerModule */], __WEBPACK_IMPORTED_MODULE_13__angular_material__["b" /* MdNativeDateModule */], __WEBPACK_IMPORTED_MODULE_13__angular_material__["c" /* MdDialogModule */],
            __WEBPACK_IMPORTED_MODULE_14__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */], __WEBPACK_IMPORTED_MODULE_16__angular_forms__["a" /* FormsModule */], __WEBPACK_IMPORTED_MODULE_16__angular_forms__["b" /* ReactiveFormsModule */], __WEBPACK_IMPORTED_MODULE_13__angular_material__["d" /* MdInputModule */], __WEBPACK_IMPORTED_MODULE_13__angular_material__["e" /* MdButtonModule */],
            __WEBPACK_IMPORTED_MODULE_13__angular_material__["f" /* MdSelectModule */], __WEBPACK_IMPORTED_MODULE_13__angular_material__["g" /* MdProgressBarModule */],
            __WEBPACK_IMPORTED_MODULE_11__angular_router__["a" /* RouterModule */].forRoot([
                {
                    path: '',
                    redirectTo: '/irs',
                    pathMatch: 'full'
                },
                {
                    path: 'irs',
                    component: __WEBPACK_IMPORTED_MODULE_4__IRSDemo_component__["a" /* IRSDemoComponent */]
                },
                {
                    path: 'sysstate',
                    component: __WEBPACK_IMPORTED_MODULE_5__SystemState_component__["a" /* SystemStateComponent */]
                },
                {
                    path: 'dbstate',
                    component: __WEBPACK_IMPORTED_MODULE_6__DBState_component__["a" /* DBStateComponent */]
                },
                {
                    path: 'rates',
                    component: __WEBPACK_IMPORTED_MODULE_9__InterestRatesComponent__["a" /* InterestRatesComponent */]
                },
                {
                    path: 'contract/:id',
                    component: __WEBPACK_IMPORTED_MODULE_12__ContractDetailComponent__["a" /* ContractDetailComponent */]
                }
            ], { useHash: true }),
            __WEBPACK_IMPORTED_MODULE_16__angular_forms__["a" /* FormsModule */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */], __WEBPACK_IMPORTED_MODULE_7__OpenOffersComponent__["a" /* OpenOffersComponent */], __WEBPACK_IMPORTED_MODULE_8__ContractListComponent__["a" /* ContractListComponent */], __WEBPACK_IMPORTED_MODULE_15__InterestRateDlgComponent__["a" /* InterestRateDlgComponent */],
            __WEBPACK_IMPORTED_MODULE_4__IRSDemo_component__["a" /* IRSDemoComponent */], __WEBPACK_IMPORTED_MODULE_5__SystemState_component__["a" /* SystemStateComponent */], __WEBPACK_IMPORTED_MODULE_6__DBState_component__["a" /* DBStateComponent */], __WEBPACK_IMPORTED_MODULE_9__InterestRatesComponent__["a" /* InterestRatesComponent */],
            __WEBPACK_IMPORTED_MODULE_17__OfferDlgComponent__["a" /* OfferDlgComponent */], __WEBPACK_IMPORTED_MODULE_12__ContractDetailComponent__["a" /* ContractDetailComponent */], __WEBPACK_IMPORTED_MODULE_18__LoginComponent__["a" /* LoginComponent */]],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_15__InterestRateDlgComponent__["a" /* InterestRateDlgComponent */], __WEBPACK_IMPORTED_MODULE_17__OfferDlgComponent__["a" /* OfferDlgComponent */]],
        providers: [__WEBPACK_IMPORTED_MODULE_10__BackendService__["a" /* BackendService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/objects.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Offer; });
/* unused harmony export Contract */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return InterestRate; });
var Offer = (function () {
    function Offer() {
    }
    return Offer;
}());

var Contract = (function () {
    function Contract() {
    }
    return Contract;
}());

var InterestRate = (function () {
    function InterestRate() {
    }
    return InterestRate;
}());

//# sourceMappingURL=objects.js.map

/***/ }),

/***/ "../../../../../src/app/templates/app.html":
/***/ (function(module, exports) {

module.exports = "\n<div >\n\t<nav class=\"navbar navbar-default navbar-fixed-top\">\n\t\t<div class=\"container\">\n\t\t\t<div class=\"navbar-header\">\n\t\t\t\t<button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n\t\t\t\t\t<span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span>\n\t\t\t\t</button>\n\t\t\t\t<a class=\"navbar-brand\" href=\"#\"><img src=\"images/logo.png\" style=\"display: inline\"> Peppermint-Chain: Interest Rate Swaps </a>\n\t\t\t</div>\n\t\t\t<div id=\"navbar\" class=\"navbar-collapse collapse\">\n\t\t\t\t<ul class=\"nav navbar-nav navbar-right\">\n\t\t\t\t\t<li class=\"active\" *ngIf=\"appState\"><a (click)=\"refresh()\">{{appState.NodeName}}</a></li>\n\t\t\t\t\t<li><a href=\"#/irs\">Contracts</a></li>\n\t\t\t\t\t<li><a href=\"#/rates\">Interest Rates</a></li>\n\t\t\t\t\t<!-- \n\t\t\t\t\t<li class=\"dropdown\"><a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Interest Rate Swaps<span class=\"caret\"></span></a>\n\t\t\t\t\t\t<ul class=\"dropdown-menu\">\n\t\t\t\t\t\t\t<li><a href=\"#/irs\">Contracts</a></li>\n\t\t\t\t\t\t\t<li><a href=\"#/rates\">Interest Rates</a></li>\n\t\t\t\t\t\t</ul></li>\n\t\t\t\t\t<li><a href=\"#/sysstate\">System State</a></li>\n\t\t\t\t\t<li><a href=\"#/dbstate\">Database</a></li>\n\t\t\t\t\t -->\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t\t<!--/.navbar-collapse -->\n\t\t</div>\n\t</nav>\n\n\t<!-- Main jumbotron for a primary marketing message or call to action -->\n\t<div class=\"container\" id=\"mainContent\">\n\t\t<router-outlet #childComponent></router-outlet>\n\t</div>\n</div>\n<!-- /container -->\n"

/***/ }),

/***/ "../../../../../src/app/templates/contract-detail.html":
/***/ (function(module, exports) {

module.exports = "<ol class=\"breadcrumb\">\n\t<li><a href=\"#/irs\">Contracts</a></li>\n\t<li class=\"active\" *ngIf=\"contract\">Contract Id: {{contract.contractId}}</li>\n</ol>\n<div class=\"panel panel-default\">\n\t<div class=\"panel-heading\">\n\t\tContract Details\n\t\t<button class=\"primary-button\" md-raised-button *ngIf=\"appState.NodeName != 'Regulator' \" (click)=\"checkForPayments()\">Check For Payment</button>\n\t</div>\n\t<div class=\"panel-body\" *ngIf=\"contract\">\n\t\t<table class=\"table table-striped\" id=\"tblContracts\" >\n\t\t\t<tbody>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<label>Contract Id:</label> {{contract.contractId}}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<label>Buyer Id:</label> {{contract.buyerId}}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<label>Seller Id:</label> {{contract.sellerId}}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<label>Start Date:</label> {{contract.startDate| date: 'MM/dd/yyyy'}}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<label>Maturity Date:</label> {{contract.maturityDate| date: 'MM/dd/yyyy'}}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<label>Coupon Freq:</label> {{contract.couponFrequency}}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<label>Next Payment:</label> {{contract.nextPaymentDate| date: 'MM/dd/yyyy'}}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<label>Prev Payment:</label> <span *ngIf=\"contract.prevPaymentDate != 'None'\">{{contract.prevPaymentDate| date: 'MM/dd/yyyy'}}</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<label>Notional Amt:</label> {{contract.notionalAmount|number: '3.2-4'}}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<label>Fixed Rate:</label> {{contract.fixedLegRate|number: '1.2-4'}}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<label>Index:</label> {{contract.floatingRateIndex}}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<label>Spread:</label> {{contract.spread|number: '1.2-4'}}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\t</div>\n\t<div class=\"panel-heading\">Payment Details</div>\n\t<div class=\"panel-body\" style=\"overflow-x: auto;\" *ngIf=\"contract\">\n\t\t<table class=\"table table-responsive\">\n\t\t\t<thead>\n\t\t\t\t<tr class=\"active\">\n\t\t\t\t\t<th>Payment Date</th>\n\t\t\t\t\t<th>Fixed Leg Amount</th>\n\t\t\t\t\t<th>Float Leg Amount</th>\n\t\t\t\t\t<th>Net Amount</th>\n\t\t\t\t</tr>\n\t\t\t</thead>\n\t\t\t<tbody *ngFor=\"let payment of contract.payments\">\n\t\t\t\t<tr>\n\t\t\t\t\t<td>{{payment.paymentDueDate| date: 'MM/dd/yyyy'}}</td>\n\t\t\t\t\t<td>{{payment.fixedLegAmount|number: '1.2-4'}}</td>\n\t\t\t\t\t<td>{{payment.floatLegAmount|number: '1.2-4'}}</td>\n\t\t\t\t\t<td>{{payment.netAmount|number: '1.2-4'}}</td>\n\t\t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\n\t</div>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/templates/contracts.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"panel panel-default\">\n\t<div class=\"panel-heading\">Open Contracts</div>\n\t<div class=\"panel-body\">\n\t\t<table class=\"table table-striped\" id=\"tblContracts\" >\n\t\t\t<tbody>\n\t\t\t\t<tr *ngFor=\"let contract of contracts\">\n\t\t\t\t\t<td style=\"padding: 20px\">\n\t\t\t\t\t\t\t\t<button   md-raised-button\n\t\t\t\t\t\t\t\t\t(click)=\"navDetails(contract)\">Details</button>\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<label>Contract Id:</label> {{contract.contractId}}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<label>Buyer Id:</label> {{contract.buyerId}}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<label>Seller Id:</label> {{contract.sellerId}}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<label>Start Date:</label> {{contract.startDate| date: 'MM/dd/yyyy'}}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<label>Maturity Date:</label> {{contract.maturityDate| date: 'MM/dd/yyyy'}}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<label>Coupon Freq:</label> {{contract.couponFrequency}}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<label>Next Payment:</label> {{contract.nextPaymentDate| date: 'MM/dd/yyyy'}}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<label>Prev Payment:</label> {{contract.prevPaymentDate| date: 'MM/dd/yyyy'}}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<label>Notional Amt:</label> {{contract.notionalAmount|number: '3.2-4'}}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<label>Fixed Rate:</label> {{contract.fixedLegRate|number: '1.2-4'}}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<label>Index:</label> {{contract.floatingRateIndex}}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<label>Spread:</label> {{contract.floatingRateSpread|number: '1.2-4'}}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\t</div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/templates/db-state.html":
/***/ (function(module, exports) {

module.exports = "\n<div style=\"margin-top: 30px\">\n\n\t<!-- Nav tabs -->\n\t<ul class=\"nav nav-tabs\" role=\"tablist\">\n\t\t<li role=\"presentation\" class=\"active\"><a href=\"#tables\"\n\t\t\taria-controls=\"tables\" role=\"tab\" data-toggle=\"tab\">Tables</a></li>\n\t\t<li role=\"presentation\"><a href=\"#hashes\" aria-controls=\"hashes\"\n\t\t\trole=\"tab\" data-toggle=\"tab\">Hashes</a></li>\n\t</ul>\n\n\t<!-- Tab panes -->\n\t<div class=\"tab-content\">\n\t\t<div role=\"tabpanel\" class=\"tab-pane active\" id=\"tables\">\n\n\t\t\t<div *ngIf=\"schema\" class=\"container-fluid\" style=\"margin-top: 20px\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-md-2\">\n\t\t\t\t\t\t<h4>\n\t\t\t\t\t\t\t<span class=\"label label-default\">Select Table To Load</span>\n\t\t\t\t\t\t</h4>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t<select name=\"db.tablename\" [(ngModel)]=\"selectedTableName\"\n\t\t\t\t\t\t\tclass=\"form-control\">\n\t\t\t\t\t\t\t<option value=\"\" disabled>Choose a Table</option>\n\t\t\t\t\t\t\t<option *ngFor=\"let table of schema.table\" [ngValue]=\"table.name\">{{table.name}}</option>\n\t\t\t\t\t\t</select>\n\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t<button class=\"btn btn-md btn-warning\" (click)=\"loadData()\">Load\n\t\t\t\t\t\t\tData</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div *ngIf=\"tableData\">\n\t\t\t\t<table class=\"table table-responsive\" id=\"tblOffers\">\n\t\t\t\t\t<thead>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<th *ngFor=\"let col of tableData.ColumnNames\">{{col}}</th>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr *ngFor=\"let row of tableData.Data\">\n\t\t\t\t\t\t\t<td *ngFor=\"let col of row\">{{col}}</td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t</thead>\n\t\t\t\t</table>\n\t\t\t</div>\n\n\n\t\t</div>\n\t\t<div role=\"tabpanel\" class=\"tab-pane\" id=\"hashes\">\n\t\t\t<div style=\"margin-top: 50px\">\n\t\t\t\t<button class=\"btn btn-md btn-warning \" (click)=\"reloadHashes()\">Refresh\n\t\t\t\t\tData</button>\n\t\t\t</div>\n\t\t\t<div *ngIf=\"schema\">\n\t\t\t\t<div class=\"container-fluid\" style=\"margin-top: 50px\"\n\t\t\t\t\t*ngFor=\"let transaction of transactionHashData\">\n\t\t\t\t\t<div class=\"row\" style=\"border-bottom: 2px solid white;margin-bottom: 10px\">\n\t\t\t\t\t\t<div class=\"col-md-10\">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-md-2\">AsOf:</div>\n\t\t\t\t\t\t<div class=\"col-md-4\">{{transaction.AsOf}}</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-md-2\">Hash:</div>\n\t\t\t\t\t\t<div class=\"col-md-4\">{{transaction.WriteSet.WriteSetHash}}</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div *ngFor=\"let table of transaction.WriteSet.tableChanges\">\n\t\t\t\t\t\t<div class=\"row\" style=\"margin-top: 10px\">\n\t\t\t\t\t\t\t<div class=\"col-md-2\"></div>\n\t\t\t\t\t\t\t<div class=\"col-md-1\">TableId:</div>\n\t\t\t\t\t\t\t<div class=\"col-md-4\">{{table.tableId}}</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t<div class=\"col-md-2\"></div>\n\t\t\t\t\t\t\t<div class=\"col-md-2\">Rows:</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"row\"  style=\"margin-bottom: 10px\">\n\t\t\t\t\t\t\t<div class=\"col-md-2\"></div>\n\t\t\t\t\t\t\t<div class=\"col-md-8\">\n\t\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t\t\t<li *ngFor=\"let rowHash of table.rowHash\">{{rowHash}}</li>\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n\n\n"

/***/ }),

/***/ "../../../../../src/app/templates/int-rate-dialog.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"newInterestRateDialog\">\n\t<h2 md-dialog-title>Add Interest Rate</h2>\n\t<md-dialog-content>\n\t<div>\n\t\t<md-input-container> <input mdInput [(ngModel)]=\"interestRate.indexName\" placeholder=\"Index Name\"> </md-input-container>\n\t</div>\n\t<div>\n\t\t<md-select placeholder=\"Frequency\" [(ngModel)]=\"interestRate.period\"> <md-option value=\"Monthly\">Monthly</md-option> <md-option value=\"Quarterly\">Quarterly</md-option> <md-option\n\t\t\tvalue=\"Half-Yearly\">Half-Yearly</md-option> <md-option value=\"Yearly\">Yearly</md-option> </md-select>\n\t</div>\n\t<div>\n\t\t<md-input-container> <input mdInput [(ngModel)]=\"interestRate.validForDate\" [mdDatepicker]=\"myDatepicker\">\n\t\t<button mdSuffix [mdDatepickerToggle]=\"myDatepicker\"></button>\n\t\t</md-input-container>\n\t\t<md-datepicker #myDatepicker></md-datepicker>\n\t</div>\n\n\t<div>\n\t\t<md-input-container> <input mdInput [(ngModel)]=\"interestRate.interestRate\"> </md-input-container>\n\n\t</div>\n\t</md-dialog-content>\n\t<div id=\"irsDlgError\">{{errorDescription}}</div>\n\t<md-dialog-actions>\n\t<button md-button (click)=\"addInterestRate()\">Add</button>\n\t<button md-button [md-dialog-close]=\"false\">Cancel</button>\n\t<div style=\"width: 100%\" *ngIf=\"showProgress\">\n\t\t<md-progress-bar [color]=\"'warn'\" [mode]=\"'indeterminate'\" ></md-progress-bar>\n\t</div>\n\t</md-dialog-actions>\n</div>"

/***/ }),

/***/ "../../../../../src/app/templates/interest-rates-view.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"panel panel-default\">\n\t<div class=\"panel-heading\">\n\t\tInterest Rates\n\t\t<button md-raised-button type=\"submit\"  class=\"primary-button\"\n\t\t\t(click)=\"newRate()\">New Interest Rate</button>\n\t</div>\n\t<div class=\"panel-body\" style=\"overflow-x: auto;\">\n\t\t<table class=\"table table-responsive\" id=\"tblOffers\">\n\t\t\t<thead>\n\t\t\t\t<tr class=\"active\">\n\t\t\t\t\t<th>Index Name</th>\n\t\t\t\t\t<th>Index Type</th>\n\t\t\t\t\t<th>Rate</th>\n\t\t\t\t\t<th>Date</th>\n\t\t\t\t</tr>\n\t\t\t</thead>\n\t\t\t<tbody *ngFor=\"let rate of knownRates\">\n\t\t\t\t<tr >\n\t\t\t\t\t<td>{{rate.indexName}}</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t{{rate.period}}\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t{{rate.interestRate|number: '1.2-4'}}\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t{{rate.validForDate| date: 'MM/dd/yyyy'}}\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\n\t</div>\n</div>\n\n<div class=\"modal fade\" id=\"newRate\" tabindex=\"-1\" role=\"dialog\">\n\t<div class=\"modal-dialog\" role=\"document\">\n\t\t<div class=\"modal-content\">\n\t\t\t<div class=\"modal-header\">\n\t\t\t\t<button type=\"button\" class=\"close\" data-dismiss=\"modal\"\n\t\t\t\t\taria-label=\"Close\">\n\t\t\t\t\t<span aria-hidden=\"true\">&times;</span>\n\t\t\t\t</button>\n\t\t\t\t<h4 class=\"modal-title\" id=\"myModalLabel\">New Interest Rate</h4>\n\t\t\t</div>\n\t\t\t<div class=\"modal-body\">\n\t\t\t\t<div class=\"container-fluid\">\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-md-3\">\n\t\t\t\t\t\t\t<label>Index Name</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-md-3\">\n\t\t\t\t\t\t\t<label>Period</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-md-3\">\n\t\t\t\t\t\t\t<label>Interest Rate</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-md-3\">\n\t\t\t\t\t\t\t<label>Valid For Date</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-md-3\">\n\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\"\n\t\t\t\t\t\t\t\t[(ngModel)]=\"modalRate.indexName\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-md-3\">\n\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\"\n\t\t\t\t\t\t\t\t[(ngModel)]=\"modalRate.period\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-md-3\">\n\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\"\n\t\t\t\t\t\t\t\t[(ngModel)]=\"modalRate.interestRate\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-md-3\">\n\t\t\t\t\t\t\t<input [mdDatepicker]=\"myDatepicker\" type=\"text\" class=\"form-control\"\n\t\t\t\t\t\t\t\t[(ngModel)]=\"modalRate.validForDate\">\n\t\t\t\t\t\t\t<button [mdDatepickerToggle]=\"myDatepicker\"></button>\n\t\t\t\t\t\t\t<md-datepicker #myDatepicker></md-datepicker>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"modal-footer\">\n\t\t\t<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"modalOK()\">OK</button>\n\t\t</div>\n\t</div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/templates/irs-demo.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\" style=\"margin-top: 20px\">\n\t<div class=\"row\">\n\t\t<div class=\"col-md-12\"></div>\n\t</div>\n\t<div class=\"row\">\n\t\t<div class=\"col-md-12\">\n\t\t\t<open-offers></open-offers>\n\t\t</div>\n\t</div>\n\t<div class=\"row\">\n\t\t<div class=\"col-md-12\">\n\t\t\t<contracts></contracts>\n\t\t</div>\n\t</div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/templates/login.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"panel panel-default\">\n\t<div class=\"panel-heading\">Login</div>\n\t<div class=\"panel-body\">\n\t\t<div>\n\t\t\t<md-input-container> <input mdInput [(ngModel)]=\"userId\" placeholder=\"UserId\"> </md-input-container>\n\t\t</div>\n\t\t<div>\n\t\t\t<md-input-container> <input type=\"password\" mdInput [(ngModel)]=\"password\" placeholder=\"Password\"> </md-input-container>\n\t\t</div>\n\t\t<button md-button (click)=\"doLogin()\">Login</button>\n\t\t<button md-button>Cancel</button>\n\n\t</div>\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/templates/offer-dialog.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"newInterestRateDialog\">\n\t<md-dialog-content>\n\t<div class=\"container-fluid\" id=\"prtTable\">\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col-md-4\">\n\t\t\t\t<md-input-container> <input mdInput placeholder=\"Contract Id\" [(ngModel)]=\"modalOffer.contractId\"></md-input-container>\n\t\t\t</div>\n\t\t\t<div class=\"col-md-4\">\n\t\t\t\t<div class=\"mat-select-wrapper\">\n\t\t\t\t\t<md-select placeholder=\"BuyerId\" [(ngModel)]=\"modalOffer.buyerId\"> <md-option *ngFor=\"let peer of peers\" [value]=\"peer.NodeName\">{{peer.NodeName}}</md-option> </md-select>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"col-md-4\">\n\t\t\t\t<div class=\"mat-select-wrapper\">\n\t\t\t\t\t<md-select placeholder=\"SellerId\" [(ngModel)]=\"modalOffer.sellerId\"> <md-option *ngFor=\"let peer of peers\" [value]=\"peer.NodeName\">{{peer.NodeName}}</md-option> </md-select>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col-md-4\">\n\t\t\t\t<md-input-container> <input mdInput placeholder=\"Fixed Rate\" [(ngModel)]=\"modalOffer.fixedLegRate\"> </md-input-container>\n\t\t\t</div>\n\t\t\t<div class=\"col-md-4\">\n\t\t\t\t<md-input-container> <input type=\"text\" placeholder=\"Index\" mdInput [(ngModel)]=\"modalOffer.floatingRateIndex\"> </md-input-container>\n\t\t\t</div>\n\t\t\t<div class=\"col-md-4\">\n\t\t\t\t<md-input-container> <input type=\"email\" placeholder=\"Spread\" mdInput [(ngModel)]=\"modalOffer.floatingRateSpread\"> </md-input-container>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col-md-4\">\n\t\t\t\t<md-input-container> <input mdInput placeholder=\"Notional Amt\" [(ngModel)]=\"modalOffer.notionalAmount\"> </md-input-container>\n\t\t\t</div>\n\t\t\t<div class=\"col-md-4\">\n\t\t\t\t<md-input-container> <input mdInput [(ngModel)]=\"modalOffer.startDate\" placeholder=\"Start Date\" [mdDatepicker]=\"offerStartDatepicker\">\n\t\t\t\t<button mdSuffix [mdDatepickerToggle]=\"offerStartDatepicker\"></button>\n\t\t\t\t</md-input-container>\n\t\t\t\t<md-datepicker #offerStartDatepicker></md-datepicker>\n\t\t\t</div>\n\t\t\t<div class=\"col-md-4\">\n\t\t\t\t<md-input-container> <input mdInput [(ngModel)]=\"modalOffer.maturityDate\" placeholder=\"Maturity Date\" [mdDatepicker]=\"offerMatDatepicker\">\n\t\t\t\t<button mdSuffix [mdDatepickerToggle]=\"offerMatDatepicker\"></button>\n\t\t\t\t</md-input-container>\n\t\t\t\t<md-datepicker #offerMatDatepicker></md-datepicker>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col-md-8\"></div>\n\t\t\t<div class=\"col-md-4\">\n\t\t\t\t<div class=\"mat-select-wrapper\">\n\t\t\t\t\t<md-select placeholder=\"Frequency\" [(ngModel)]=\"modalOffer.couponFrequency\"> <md-option value=\"Monthly\">Monthly</md-option> <md-option value=\"Quarterly\">Quarterly</md-option> <md-option\n\t\t\t\t\t\tvalue=\"Half-Yearly\">Half-Yearly</md-option> <md-option value=\"Yearly\">Yearly</md-option> </md-select>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t</md-dialog-content>\n\t<md-dialog-actions>\n\t<button md-button (click)=\"addNewOffer()\">Add</button>\n\t<button md-button [md-dialog-close]=\"false\">Cancel</button>\n\t<div style=\"width: 100%\" *ngIf=\"showProgress\">\n\t\t<md-progress-bar [color]=\"'warn'\" [mode]=\"'indeterminate'\"></md-progress-bar>\n\t</div>\n\t</md-dialog-actions>\n</div>"

/***/ }),

/***/ "../../../../../src/app/templates/open-offers.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"panel panel-default\">\n\t<div class=\"panel-heading\">\n\t\tProposals\n\t\t<button class=\"primary-button\" md-raised-button \n\t\t\t(click)=\"newTrade()\">New Trade</button>\n\t</div>\n\t<div class=\"panel-body\" style=\"overflow-x: auto;\">\n\t\t<table class=\"table\" id=\"tblOffers\">\n\t\t\t<tbody>\n\t\t\t\t<tr *ngFor=\"let offer of offers\"  [class.pendingOffer]=\"offer.pending\">\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<div class=\"cellContainer\">\n\t\t\t\t\t\t\t<div *ngIf=\"offer.pending\">\n\t\t\t\t\t\t\t\t<label style=\"margin-bottom: 20px; color: #f89c00\">Pending Confirmation</label> \t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<label style=\"margin-bottom: 20px\">Proposed\n\t\t\t\t\t\t\t\t\tBy:</label> {{offer.proposedBy}} \n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div *ngIf=\"!offer.pending\">\n\t\t\t\t\t\t\t\t<button   md-raised-button\n\t\t\t\t\t\t\t\t\t*ngIf=\"offer.proposedBy == appState.NodeName\"\n\t\t\t\t\t\t\t\t\t(click)=\"proposeEdits(offer)\">Edit</button>\n\t\t\t\t\t\t\t\t<button   md-raised-button\n\t\t\t\t\t\t\t\t\t*ngIf=\"offer.proposedBy != appState.NodeName\"\n\t\t\t\t\t\t\t\t\t(click)=\"acceptOffer(offer)\">Accept</button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<div class=\"cellContainer\">\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<label>Contract Id:</label> {{offer.contractId}}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<label>Buyer Id:</label> {{offer.buyerId}}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<label>Seller Id:</label> {{offer.sellerId}}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<div class=\"cellContainer\">\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<label>Start Date:</label> {{offer.startDate| date: 'MM/dd/yyyy'}}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<label>Maturity Date:</label> {{offer.maturityDate| date: 'MM/dd/yyyy'}}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<label>Coupon Freq:</label> {{offer.couponFrequency}}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<div class=\"cellContainer\">\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<label>Notional Amt:</label> {{offer.notionalAmount|number: '3.2-4'}}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<label>Fixed Rate:</label> {{offer.fixedLegRate|number: '1.2-4'}}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<label>Index:</label> {{offer.floatingRateIndex}}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<label>Spread:</label> {{offer.floatingRateSpread|number: '1.2-4'}}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\n\t</div>\n</div>\n\n<!-- \n\n\t\t\t\t\t<tr class=\"active\" >\n\t\t\t\t\t\t<td colspan=\"9\" ><button *ngIf=\"opair.myOffer\" class=\"btn btn-sm btn-warning\"\n\t\t\t\t\t\t\t\t(click)=\"proposeEdits(opair.counterOffer)\">Accept\n\t\t\t\t\t\t\t\tChanges</button>\n\t\t\t\t\t\t\t<button *ngIf=\"opair.myOffer\" class=\"btn btn-sm btn-warning\"\n\t\t\t\t\t\t\t\t(click)=\"proposeEdits(opair.myOffer)\">Edit</button></td>\n\t\t\t\t\t</tr>\n -->\n<div class=\"modal fade\" id=\"newTrade\" tabindex=\"-1\" role=\"dialog\">\n\t<div class=\"modal-dialog\" role=\"document\">\n\t\t<div class=\"modal-content\">\n\t\t\t<div class=\"modal-header\">\n\t\t\t\t<button type=\"button\" class=\"close\" data-dismiss=\"modal\"\n\t\t\t\t\taria-label=\"Close\">\n\t\t\t\t\t<span aria-hidden=\"true\">&times;</span>\n\t\t\t\t</button>\n\t\t\t\t<h4 class=\"modal-title\" id=\"myModalLabel\">New Trade</h4>\n\t\t\t</div>\n\t\t\t<div class=\"modal-body\">\n\t\t\t\t<div class=\"container-fluid\">\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t<label>Contract id</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t<label>Buyer Id</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t<label>Seller Id</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\"\n\t\t\t\t\t\t\t\t[(ngModel)]=\"modalOffer.contractId\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t<select name=\"buyerId\" [(ngModel)]=\"modalOffer.buyerId\"\n\t\t\t\t\t\t\t\tclass=\"form-control\">\n\t\t\t\t\t\t\t\t<option value=\"\" disabled>Choose an Org</option>\n\t\t\t\t\t\t\t\t<option *ngFor=\"let peer of appState.Peers\"\n\t\t\t\t\t\t\t\t\t[ngValue]=\"peer.NodeName\">{{ peer.NodeName }}</option>\n\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t<select name=\"modalOffer.sellerId\"\n\t\t\t\t\t\t\t\t[(ngModel)]=\"modalOffer.sellerId\" class=\"form-control\">\n\t\t\t\t\t\t\t\t<option value=\"\" disabled>Choose an Org</option>\n\t\t\t\t\t\t\t\t<option *ngFor=\"let peer of appState.Peers\"\n\t\t\t\t\t\t\t\t\t[ngValue]=\"peer.NodeName\">{{ peer.NodeName }}</option>\n\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t<label>Fixed Rate</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t<label>Float Index</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t<label>Spread</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\"\n\t\t\t\t\t\t\t\t[(ngModel)]=\"modalOffer.fixedLegRate\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t<input type=\"email\" class=\"form-control\"\n\t\t\t\t\t\t\t\t[(ngModel)]=\"modalOffer.floatingRateIndex\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t<input type=\"email\" class=\"form-control\"\n\t\t\t\t\t\t\t\t[(ngModel)]=\"modalOffer.spread\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t<label>Notional Amt</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t<label>Start Date</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t<label>Maturity Date</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\"\n\t\t\t\t\t\t\t\t[(ngModel)]=\"modalOffer.notionalAmount\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t<input type=\"email\" class=\"form-control\"\n\t\t\t\t\t\t\t\t[(ngModel)]=\"modalOffer.startDate\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t<input type=\"email\" class=\"form-control\"\n\t\t\t\t\t\t\t\t[(ngModel)]=\"modalOffer.maturityDate\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t<label>Frequency</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\"\n\t\t\t\t\t\t\t\t[(ngModel)]=\"modalOffer.couponFrequency\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"modal-footer\">\n\t\t\t<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"modalOK()\">OK</button>\n\t\t</div>\n\t</div>\n</div>\n\n\n"

/***/ }),

/***/ "../../../../../src/app/templates/sys-state.html":
/***/ (function(module, exports) {

module.exports = "<h3>Current Node State</h3>\n\n<div class=\"container-fluid\" style=\"margin-top: 20px\">\n\t<div class=\"row\" *ngIf=\"appState\">\n\t\t<div class=\"col-md-8\" > \n\t\t\t<form class=\"form-horizontal\" >\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<label class=\"col-sm-4 control-label\">NodeName</label>\n\t\t\t\t\t<div class=\"col-sm-8\">\n\t\t\t\t\t\t<label class=\"control-label\">{{appState.NodeName}}</label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<label class=\"col-sm-4 control-label\">Last Block Processed</label>\n\t\t\t\t\t<div class=\"col-sm-8\">\n\t\t\t\t\t\t<label class=\"control-label\">{{appState.LastBlock}}</label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<label class=\"col-sm-4 control-label\">Last Block Processed\n\t\t\t\t\t\tAt</label>\n\t\t\t\t\t<div class=\"col-sm-8\">\n\t\t\t\t\t\t<label class=\"control-label\">{{appState.LastBlockTime}}</label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t</div>\n\t\t<div class=\"col-md-4\">\n\t\t<h4>Modules Deployed </h4>\n\t\t<ul>\n\t\t\t<li *ngFor=\"let mod of appState.Modules\">{{mod}}</li>\n\t\t</ul>\n\t\t</div>\n\t</div>\n</div>\n\n<table class=\"table\" *ngIf=\"appState\">\n\t<tr>\n\t\t<th>NodeName</th>\n\t\t<th>ExternalIpAddress</th>\n\t\t<th>DB Port</th>\n\t\t<th>App Port</th>\n\t\t<th>Consensus Port</th>\n\t\t<th>Public Key</th>\n\t</tr>\n\t<tr *ngFor=\"let peer of appState.Peers\">\n\t\t<td>{{peer.NodeName}}</td>\n\t\t<td><a href=\"http://{{peer.ExternalIpAddress}}:5000/\">{{peer.ExternalIpAddress}}</a></td>\n\t\t<td>{{peer.ExternalAppPort-1}}</td>\n\t\t<td>{{peer.ExternalAppPort}}</td>\n\t\t<td>{{peer.ExternalNodePort}}</td>\n\t\t<td>{{peer.ThetaNodePubKey}}</td>\n\t</tr>\n\n</table>"

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map