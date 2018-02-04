({
    //obsolete method
	getFilterFields : function(component,event){

        //get fields of selected object
        var action = component.get("c.getFields");
        action.setParams({
            objectName : 'Account'
        });
        action.setCallback(this,function(response){
              var state = response.getState();
            if (state === "SUCCESS") {
                var availableFields = response.getReturnValue();
				component.set('v.fields', availableFields);
            }else if (state === "INCOMPLETE") {			                
            }else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
           
        });
        $A.enqueueAction(action);
    }
})