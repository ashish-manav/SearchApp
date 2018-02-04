({
	showToast: function(component,title,message,type){
        //   console.log(type);
       
        var  type = type;
        if(type == undefined){
            type = 'success';
        }
        var  css = 'toast-top-center';
        var  msg = message;
        toastr.options = {
          "closeButton": true,
          "debug": false,
          "newestOnTop": false,
          "progressBar": false,
          "preventDuplicates": false,
          "onclick": null,
          "showDuration": "300",
          "hideDuration": "1000",
          "timeOut": 0,
          "extendedTimeOut": 0,
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut",
          "tapToDismiss": false,
          "positionClass" : 'toast-top-center'
        };
                
        /*
        toastr.options.positionClass = 'toast-top-full-width';
        toastr.options.extendedTimeOut = 0; //1000;
        toastr.options.timeOut = 0;
        toastr.options.fadeOut = 250;
        toastr.options.fadeIn = 250;
        toastr.options.positionClass = css;
        toastr.options.closeButton = true;
*/

        toastr[type](msg);
    },
    showError : function(component,title,message,type){
        component.set("v.showError",true);
    }
})