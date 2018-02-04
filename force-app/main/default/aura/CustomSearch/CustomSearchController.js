({
    doInit : function(component,event,helper){
    },
    setShowMe : function(cmp, event, helper)
    {
        var id = event.currentTarget.id;
        if(id !='CaseTracker'){
        	if(cmp.find('caseTracker') !=undefined){
        		cmp.find('caseTracker').destroy();
        	}                
        }
        cmp.set("v.showLayout", id);
        var myParentDiv = cmp.find("parentSideDiv");
        var myDiv = cmp.find("l"+id);
        var myDiv1 = cmp.find("lDashboard");
        var myDiv2 = cmp.find("lCaseTracker");
        var myDiv3 = cmp.find("lHelp");
        $A.util.removeClass(myDiv1, 'activeIcon');
        $A.util.removeClass(myDiv2, 'activeIcon');
        $A.util.removeClass(myDiv3, 'activeIcon');
        var myDiv = cmp.find("l"+id);
        $A.util.addClass(myDiv, 'activeIcon');
        
    },
    handleClick : function(component, event, helper) {}
    
})