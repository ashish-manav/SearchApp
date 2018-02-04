({
	//to display success message
    showMessage: function(component, event, helper) {
        console.log('');
        if(event.getParam('action') == 'error'){
            helper.showError(component,event.getParam('title'),event.getParam('message'),event.getParam('type'));
        }else{
            helper.showToast(component,event.getParam('title'),event.getParam('message'),event.getParam('type'));
        }
    },
    closeError: function(component,event,helper){
        component.set("v.showError", false);
    }
})