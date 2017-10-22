import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.acme.mynetwork{
   export class Commodity extends Asset {
      tradingSymbol: string;
      mainExchange: string;
      amount: number;
      owner: Trader;
      reciever : Vendor;
   }
   export class Vendor extends Participant {
        venderId : string;
        vendorName : string;
   }

   export class Trader extends Participant {
      tradeId: string;
      firstName: string;
      lastName: string;
   }
   export class Trade extends Transaction {
      commodity: Commodity;
      newOwner: Trader;
   }
// }
/*
asset Commodity identified by tradingSymbol {
    o String tradingSymbol
    o String mainExchange
    o Double amount
    --> Trader owner
    --> Vendor reciever
}
participant Trader identified by tradeId {
    o String tradeId
    o String firstName
    o String lastName
    
}

participant Vendor identified by vendorId {
  o String vendorId
  o String vendorName

}
transaction Trade {
    --> Commodity commodity
    --> Vendor newReciever
}
*/