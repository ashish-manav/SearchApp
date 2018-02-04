<aura:application extends="force:slds">
 <ltng:require styles="{!$Resource.Toastr}" 
               scripts="{!join(',',
                        $Resource.SearchAppRes + '/SearchAppRes/jquery.min.js',
                        $Resource.SearchAppRes + '/SearchAppRes/jquery-ui.min.js',
                        $Resource.TosterJs)}"
                  afterScriptsLoaded="{!c.scriptsLoaded}" />
	<c:CustomSearch ></c:CustomSearch>
    <!--<c:LightningDataTable ></c:LightningDataTable>-->
    <!--<c:DemoComponent ></c:DemoComponent>-->
</aura:application>