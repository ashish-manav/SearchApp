/** Client-Side Controller **/
({
    initialize: function (component, event, helper) {
        var required = ["Name"];
        component.set("v.requiredOptions", required);
    },
    handleChange: function (cmp, event) {
        // Get the list of the "value" attribute on all the selected options
        //do nothing
        //var selectedOptionsList = event.getParam("value");
        //console.log("Options selected: '" + selectedOptionsList + "'");
    },
    closeModal : function(component,event,helper){
        var toggleModal = component.getEvent("modalActionCompEvent");
        toggleModal.setParams({
            "modalAction" : "Close"
        });
        toggleModal.fire();
    },
    submit : function(component,event,helper){
        var toggleAndSave = component.getEvent("modalActionCompEvent");
        toggleAndSave.setParams({
            "modalAction" : "SaveClose",
            "fieldsToDisplay" : component.get("v.defaultOptions")
        });
        toggleAndSave.fire();
    }
    
})