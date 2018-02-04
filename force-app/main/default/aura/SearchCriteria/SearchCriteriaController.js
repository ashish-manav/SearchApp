({
    doInit : function(component, event, helper) {
        var searchItem = component.get('v.searchItems');
        searchItem.push(1);
        component.set('v.searchItems',searchItem);
        helper.getFilterFields(component,event);
        helper.loadOptions(component,event);
         // create a Default RowItem [Contact Instance] on first time Component Load
        // by call this helper function  
        helper.createObjectData(component, event);
        helper.searchResults(component,event);
    },
    waiting: function(component, event, helper) {
        component.set('v.showSpinner',true);
    },
    doneWaiting: function(component, event, helper) {
        component.set('v.showSpinner',false);
    },
    getFilterFields : function(component,event,helper){
        helper.getFilterFields(component,event);
        var fieldList = [];
        fieldList.push("Name");
        component.set('v.fieldsToDisplay',fieldList);
        component.set("v.filterList",[]);
        helper.createObjectData(component,event);
        helper.searchResults(component,event);
    },
    // function for create new object Row in Contact List 
    addNewRow: function(component, event, helper) {
        // call the comman "createObjectData" helper method for add new Object Row to List 
        component.set("v.addCriteria", false); 
        helper.addFilterToList(component,event);
        //helper.creatsfeObjectData(component, event);
    },
    // function for delete the row 
    removeDeletedRow: function(component, event, helper) {
        // get the selected row Index for delete, from Lightning Event Attribute  
        var index = event.getParam("indexVar");
        // get the all List (filterList attribute) and remove the Object Element Using splice method    
        var AllRowsList = component.get("v.filterList");
        AllRowsList.splice(index, 1);
        // set the filterList after remove selected row element  
        component.set("v.filterList", AllRowsList);
    },
    doSearch : function(component,event,helper){
        helper.searchResults(component,event);
    },
    handleChange : function(component,event,helper){
        var changeValue = event.getParam("value");
        component.set("v.conditionValue", changeValue[0]);
    },
    doBack : function(component,event,helper){
        component.set('v.showSearchResult', false);
    },
    doSaveFilter : function(component,event,helper){
      /*  var filterList = component.get('v.filterList');
        console.log(filterList);
        var action = component.get('c.saveSearchCriteria');
        action.setParams({
            searchFilters : JSON.stringify(filterList),
            searchObject : component.get('v.selectedObject')
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state==="SUCCESS"){
                component.set('v.showSearchResult', true);
                var rtnValue = response.getReturnValue();
                component.set("v.mycolumns",rtnValue.tableColumn);
                component.set("v.mydata",rtnValue.tableRecord);
                console.log(rtnValue);
            }else if (state === "ERROR"){
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +errors[0].message);
                    }
                }else{
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
        */
    },
    handleShowModal: function(component, event, helper) {
        component.set("v.showModal", true);
    },
    handleSaveCloseModal : function(component,event,helper){
        var action = event.getParam("modalAction");
        if(action =="SaveClose"){
            component.set("v.fieldsToDisplay",event.getParam("fieldsToDisplay"));
            console.log(component.get("v.fieldsToDisplay"));
        }
        component.set("v.showModal", false);
    },
    handleLimitChange: function (component, event) {
        // Get the string of the "value" attribute on the selected option
        var selectedOptionValue = event.getParam("value");
        component.set("v.limit", selectedOptionValue);
        //alert("Option selected with value: '" + selectedOptionValue + "'");
    },
    handleOrderByChange: function (component, event) {
        // Get the string of the "value" attribute on the selected option
        var selectedOptionValue = event.getParam("value");
        component.set("v.orderby", selectedOptionValue);
        //alert("Option selected with value: '" + selectedOptionValue + "'");
    },
    maximizeResults : function(component,event){
        component.set('v.showSearchResult', true);
    },
    maximizeCriteria: function(component,event){
        if(component.get('v.showRecentRecords') == true){
            component.set('v.showRecentRecords', false);
        	component.set('v.searchCriteriaLayoutSize', 12);
        }else{
            component.set('v.showRecentRecords', true);
        	component.set('v.searchCriteriaLayoutSize', 7);
        }
    },
    showToast : function(component, event, helper) {
            	var appEvent = $A.get("e.c:ShowToast");
        appEvent.setParams({ "title" : "Success !","message":"Email has been sent", "type":"error","action": "toast"});
                appEvent.fire();
        },
    AddCriteria : function(component,event,helper){
        component.set("v.addCriteria", true);
    }
    
})