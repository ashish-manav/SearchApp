({
	doInit : function(component, event, helper) {
		//helper.getFilterFields(component,event);
	},
    waiting: function(component, event, helper) {
    	component.set('v.showSpinner',true);
    },
    doneWaiting: function(component, event, helper) {
    	component.set('v.showSpinner',false);
    },
    AddNewRow : function(component, event, helper){
       // fire the AddNewRowEvt Lightning Event 
        component.getEvent("AddRowEvt").fire();     
    },
    removeRow : function(component, event, helper){
     // fire the DeleteRowEvt Lightning Event and pass the deleted Row Index to Event parameter/attribute
       component.getEvent("DeleteRowEvt").setParams({"indexVar" : component.get("v.rowIndex") }).fire();
    }, 
    handleFieldsChange : function(component,event,helper){
        console.log('fields changed');
    },
    fieldChange : function(component,event,helper){
		var selectedFilter = [];
        var fieldWithType1 = component.get('v.tempSelectedItem');
        var availFields = component.get("v.availableFields");
        selectedFilter = $.grep(availFields,function(el){
            return fieldWithType1 == el.value;
        });
         console.log(selectedFilter);  
        
        /*var fieldWithType = component.get('v.tempSelectedItem');
        console.dir(fieldWithType);

        var fieldApiWithType = [];
        fieldApiWithType = fieldWithType.split("--");
         */
        var fieldApi = selectedFilter[0].value;
        var fieldType = selectedFilter[0].type;
        console.log(fieldType);
       
        if(fieldType =='url' || fieldType =='date' ||fieldType =='email' || fieldType =='currency'){
       		component.set("v.tempSelectedType",fieldType);     
        }else if(fieldType =='integer'){
            component.set("v.tempSelectedType",'number');
        }else if(fieldType =='phone'){
            component.set("v.tempSelectedType",'tel');
        }else if(fieldType =='picklist'){
            component.set("v.picklistValue", selectedFilter[0].picklistValue);
            component.set("v.tempSelectedType",'picklist');
        }else{
            component.set("v.tempSelectedType",'string');
        }
        component.set("v.searchJson.FieldName", fieldApi);
        component.set("v.selectedType", fieldType); 
        //reset input field value
        component.set("v.searchJson.Value", '');
       
       
    }
    
})