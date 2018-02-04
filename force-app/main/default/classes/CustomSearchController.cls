public class CustomSearchController {
    @AuraEnabled
    public static List<String> searchForIds(String searchText) {
        List<List<SObject>> results = [FIND :searchText IN ALL FIELDS  RETURNING Account(Id), Campaign(Id), Contact(Id), Lead(Id)];
        List<String> ids = new List<String>();
        for (List<SObject> sobjs : results) {
            for (SObject sobj : sobjs) {
                ids.add(sobj.Id);
            }
        }
        return ids;
    }
    
    @AuraEnabled
    public static List<Object> getFields(String objectName){
        String sobject_type = objectName;
        Schema.SObjectType targetType = Schema.getGlobalDescribe().get(sobject_type);
        Schema.DescribeSObjectResult describe = targetType.getDescribe();
        Map<String, Schema.SObjectField> fieldsMap = describe.fields.getMap();
         List<Object> options=new List<Object>();
        for(Schema.SObjectField sfield : fieldsMap.Values()){
            schema.describefieldresult dfield = sfield.getDescribe();
            Map<String,Object> obj=new Map<String,Object>();
            obj.put('label', dfield.getLabel());
            obj.put('value', dfield.getname());
            obj.put('selected', 'false');
            obj.put('type',String.valueof(dfield.getType()).toLowerCase());
            
            if(String.valueof(dfield.getType()).toLowerCase() == 'picklist'){
                obj.put('isPickList','true');
                Schema.DescribeFieldResult fieldResult = fieldsMap.get(dfield.getname()).getDescribe();
                List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
                List<String> pickValue=new List<string>();
                 for( Schema.PicklistEntry pe : ple){
                    if(pe.getValue() !=null){
                        pickValue.add(pe.getValue());
                    }
                }
                obj.put('picklistValue', pickValue);
            }else{
                obj.put('isPickList','false');
                obj.put('picklistValue', 'null');
            }
            options.add(obj);
        }
        system.debug('#options--' + options);
        return options;
    }
    
    @AuraEnabled
    public static List<Object> getFieldSetFields(String objectName){
        String sobject_type = objectName;
        String fsName = 'Search';
        Schema.SObjectType targetType = Schema.getGlobalDescribe().get(sobject_type);
        Schema.DescribeSObjectResult describe = targetType.getDescribe();
        Map<String, Schema.SObjectField> fieldsMap = describe.fields.getMap();
        //all fieldSet 
        Map<String, Schema.FieldSet> fsMap = describe.fieldSets.getMap();
        //specific fieldset
        Schema.FieldSet fs = fsMap.get(fsName);        
        List<Schema.FieldSetMember> fieldSet = fs.getFields();
        List<Schema.SObjectField> fieldSetFields = new List<Schema.SObjectField>(); 
        List<Object> options=new List<Object>();
        for(Schema.FieldSetMember f : fieldSet) {
            Map<String,String> obj=new Map<String,string>();
            obj.put('label', f.getLabel());
            obj.put('value', f.getFieldPath());
            obj.put('selected', 'false');
            obj.put('type',String.valueof(f.getType()).toLowerCase());
            options.add(obj);
        }
        return options;
    }

	    
    @AuraEnabled
    public static lightningTableWraper getSearchResults(String searchFilters, String searchObject, List<String> displayFieldList, Integer recordLimit){
        system.debug('searchFilters '+ searchFilters);

        list<FilterCriteria> filterCriteriaList = (List<FilterCriteria>) JSON.deserialize(searchFilters,List<FilterCriteria>.class);
        system.debug(filterCriteriaList);
        system.debug('record limit ' + recordLimit);
        Integer recLimit = Integer.valueOf(recordLimit);
        String query = 'Select Id, ';
        String tempQueryHead = '';
        String tempQueryMid = ' FROM '+searchObject;
        String tempQueryTail = ' Where ';
        String fieldstoget = '';
        for(String field : displayFieldList){
            fieldstoget = fieldstoget + field + ',';
        }
        
        if(filterCriteriaList != null && filterCriteriaList.size()>0){
            for(FilterCriteria filter : filterCriteriaList){
                if(filter.FieldName != null && filter.FieldName != ''){
                    //tempQueryHead = tempQueryHead + filter.FieldName + ', ';
                    tempQueryTail = tempQueryTail + filter.FieldName + ' ' +filter.Operator + '\'' +filter.Value +'\' AND ' ;
                    //fieldstoget = fieldstoget + filter.FieldName + ',';
                }                
            }
        }
        
        if(tempQueryTail == ' Where '){
            tempQueryTail = '';
        }else{
            tempQueryTail = tempQueryTail.removeEndIgnoreCase(' AND ');
        }
        
        //Code for lightning datatable        
        if(fieldstoget ==''){
			fieldstoget = 'Name';
        }
        
        List<String> lstfieldstoget = fieldstoget.split(',');
        List<lightningTableColumnWrapper> lstTableColumn = new list<lightningTableColumnWrapper> ();
        DescribeSObjectResult objResult = Schema.getGlobalDescribe().get(searchObject).getDescribe();
        
        for(String field : lstfieldstoget){
            lightningTableColumnWrapper colWrapper = new lightningTableColumnWrapper();
            DescribeFieldResult fieldResult = objResult.fields.getMap().get(field).getDescribe();
            colWrapper.label = fieldResult.getLabel();
            colWrapper.fieldName = fieldResult.getName();
            colWrapper.type = String.valueof(fieldResult.getType()).toLowerCase();
            colWrapper.sortable = true;
            lstTableColumn.add(colWrapper);
        }
        
        String queryString = 'Select '+ String.escapeSingleQuotes(String.join(lstfieldstoget,','))+
            ' from '+ String.escapeSingleQuotes(searchObject) + tempQueryTail +' Limit '+recordLimit;
        
        system.debug('queryString '+ queryString);
        LightningTableWraper ltngTableWrapper = new LightningTableWraper();
        ltngTableWrapper.tableRecord = database.query(queryString);
        ltngTableWrapper.tableColumn = lstTableColumn;
        
        return ltngTableWrapper;
        // return sobjList;
        
    }
    
    public class lightningTableColumnWrapper {
        @AuraEnabled
        public string label {get;set;}
        @AuraEnabled
        public String fieldName {get;set;}
        @AuraEnabled
        public string type {get;set;}
        @AuraEnabled
        public boolean sortable {get;set;}
        
    }
    
    public class lightningTableWraper{
        @AuraEnabled
        public List<sObject> tableRecord {get;Set;}
        @AuraEnabled
        public List<lightningTableColumnWrapper> tableColumn {get;set;}
        
    }
    
}