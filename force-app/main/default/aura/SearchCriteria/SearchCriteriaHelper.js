({
    getFilterFields: function (component, event) {

        //get fields of selected object
        var action = component.get("c.getFields");
        action.setParams({
            objectName: component.get('v.selectedObject')
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var availableFields = response.getReturnValue();
                component.set('v.fields', availableFields);
                //console.log(availableFields);
                var viewFields = [];
                for (var i = 0; i < availableFields.length; i++) {
                    var field = {};
                    field.label = availableFields[i].label;
                    field.value = availableFields[i].value;
                    viewFields.push(field);
                }
                //console.log(viewFields);
                component.set("v.viewableFieldOptions", viewFields);
            } else if (state === "INCOMPLETE") {
            } else if (state === "ERROR") {
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
    },
    createObjectData: function (component, event) {
        // get the filterList from component and add(push) New Object to List  
        var RowItem = [];
        RowItem.push({
            'FieldName': '',
            'Operator': '',
            'Value': ''
        });
        component.set("v.searchItem", RowItem[0]);
    },
    addFilterToList: function (component, event) {
        var RowItem = component.get("v.searchItem");
        var RowItemList = component.get("v.filterList");
        var newRowItem = [];
        newRowItem.push({
            'FieldName': RowItem.FieldName,
            'Operator': RowItem.Operator,
            'Value': RowItem.Value
        })
        RowItemList.push(newRowItem[0]);
        component.set("v.filterList", []);
        component.set("v.filterList", RowItemList);
    },
    searchResults: function (component, event) {

        var filterList = component.get('v.filterList');
        var limit = component.get('v.limit');
/*
        console.log('selected object ' + component.get('v.selectedObject'));
        console.log('filterList ');
        console.log(filterList);
        console.log('limit ' + limit);
        console.log('fields to display');
        console.log(component.get('v.fieldsToDisplay'));
*/
        if (limit == 'Custom') {
            limit = component.get('v.customLimit');
        }
        var isCriteriaValid = false;
        if(filterList.length >0){
            for (var i = 0; i < filterList.length; i++) {
            if ((filterList[i].FieldName != '' && filterList[i].Operator != '') || (filterList[i].FieldName == '' && filterList[i].Operator == '' && filterList[i].Value == '')) {
                isCriteriaValid = true;
            	}
            }
        }else{
            isCriteriaValid = true;
        }
        

        if (isCriteriaValid) {
            var action = component.get('c.getSearchResults');
            action.setParams({
                searchFilters: JSON.stringify(filterList),
                searchObject: component.get('v.selectedObject'),
                displayFieldList: component.get('v.fieldsToDisplay'),
                recordLimit: limit
            });

            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var rtnValue = response.getReturnValue();
                    component.set("v.mycolumns", rtnValue.tableColumn);
                    component.set("v.mydata", rtnValue.tableRecord);
                    var noOfRecords = rtnValue.tableRecord.length;
                    component.set("v.recordCount", noOfRecords);
                    if (component.get('v.showRecentRecords') == false) {
                        component.set('v.showRecentRecords', true);
                        component.set('v.searchCriteriaLayoutSize', 7);
                    }
                } else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
            });
            $A.enqueueAction(action);
        }
    },
    loadOptions: function (component, event) {
        var options = [
            { value: "10", label: "10" },
            { value: "50", label: "50" },
            { value: "100", label: "100" },
            { value: "Custom", label: "Custom" }
        ];
        component.set("v.statusOptions", options);
        var orderBy = [
            { value: "ASC", label: "Latest" },
            { value: "DSC", label: "Oldest" }
        ];
        component.set("v.orderByOptions", orderBy);
    },
})