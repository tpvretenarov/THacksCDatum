import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommodityService } from './Commodity.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Commodity',
	templateUrl: './Commodity.component.html',
	styleUrls: ['./Commodity.component.css'],
  providers: [CommodityService]
})
export class CommodityComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          tradingSymbol = new FormControl("", Validators.required);
                
  
      
          mainExchange = new FormControl("", Validators.required);
        
  
      
          amount = new FormControl("", Validators.required);
        
  
      
          owner = new FormControl("", Validators.required);

          reciever = new FormControl("",Validators.required);
        
  


  constructor(private serviceCommodity:CommodityService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          tradingSymbol:this.tradingSymbol,
        
            
    
        
          mainExchange:this.mainExchange,
        
    
        
          amount:this.amount,
        
    
        
          owner:this.owner,

          reciever:this.reciever

          
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceCommodity.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.acme.mynetwork.Commodity",
      
        
          "tradingSymbol":this.tradingSymbol.value,
              
      
        
          "mainExchange":this.mainExchange.value,
        
      
        
          "amount":this.amount.value,
        
      
        
          "owner":this.owner.value,

          "reciever":this.reciever.value
        
      
    };

    this.myForm.setValue({
      
        
          "tradingSymbol":null,
        
      
        
          "mainExchange":null,
        
      
        
          "amount":null,
        
      
        
          "owner":null,


          "reciever":null

        
      
    });

    return this.serviceCommodity.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "tradingSymbol":null,
      
      
        
          "mainExchange":null,
        
      
        
          "amount":null,
        
      
        
          "owner":null,

          "reciever":null
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.acme.mynetwork.Commodity",
      
        
        
          
            "tradingSymbol":this.tradingSymbol.value,
          
        
    
        
          
            "mainExchange":this.mainExchange.value,
          
        
    
        
          
            "amount":this.amount.value,
          
        
    
        
          
            "owner":this.owner.value,

            "vendor":this.reciever.value
          
        
    
    };

    return this.serviceCommodity.updateAsset(form.get("tradingSymbol").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceCommodity.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceCommodity.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "tradingSymbol":null,
          
          
            "mainExchange":null,
          
        
          
            "amount":null,
          
        
          
            "owner":null,

            "reciever":null
          
        
      };



      
        if(result.tradingSymbol){
          
            formObject.tradingSymbol = result.tradingSymbol;
          
        }else{
          formObject.tradingSymbol = null;
        }      
      
        if(result.mainExchange){
          
            formObject.mainExchange = result.mainExchange;
          
        }else{
          formObject.mainExchange = null;
        }
      
        if(result.amount){
          
            formObject.amount = result.amount;
          
        }else{
          formObject.amount= null;
        }
      
        if(result.owner){
          
            formObject.owner = result.owner;
          
        }else{
          formObject.owner = null;
        }
        if(result.reciever){
          formObject.reciever = result.reciever;
        }else{
          formObject.reciever = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "tradingSymbol":null,
      
        
          "mainExchange":null,
        
      
        
          "amount":null,
        
      
          "owner":null, 

          "reciever":null
        
      
      });
  }

}
