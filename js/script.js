$(document).ready(function(e){

    $('#nav-icon').click(function(){
       $(this).toggleClass('open');
        
    });

    $('.product .up').on('click',function(e){
        e.preventDefault();

        var input=$(this).closest('.product').find('.number');

        var val= parseInt($(input).val());
         
        if(val<99)  val+=1;

        $(input).val(val);

    });

    $('.product .down').on('click',function(e){
        e.preventDefault();

        var input=$(this).closest('.product').find('.number');

        var val= parseInt($(input).val());
         
        if(val>1)  val-=1;

        $(input).val(val);

    });

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    $('#steps-form button[type="button"]').on('click', function(e){

        var parent=$(this).closest('.screen');
       
        $(parent).find("input").each(
            function(index){  
                var input = $(this);
                var has_errors=false;
                if(input.val().length==0) {

                    if(input.attr('type')=='email') 
                    {
                        if(!validateEmail(input.val())){  input.addClass('input-error'); has_errors=true;}
                        else input.removeClass('input-error');
                    }else  input.addClass('input-error'); has_errors=true;
                    
                } else  input.removeClass('input-error');

                if(has_errors) $('.form-error').text("* One or more fields empty or filled incorrect");
                else{
                    $(parent).hide();
                    $(parent).next('.screen').show();                    
                    $('.form-error').text('');
                }
                //alert('Type: ' + input.attr('type') + 'Name: ' + input.attr('name') + 'Value: ' + input.val());
            }
        );
        
    });

    var form = $("#steps-form").show();
 
form.steps({
    headerTag: "h3",
    bodyTag: "fieldset",
    transitionEffect: "slideLeft",
    titleTemplate: "#title#",
    enablePagination: true,
    labels: {
        cancel: "Cancel",
        current: "",
        pagination: "Pagination",
        finish: "Finish",
        next: "Next",
        previous: "",
        loading: "Loading ..."
    },
    onStepChanging: function (event, currentIndex, newIndex)
    {
        if (currentIndex > 0) {
            $('.actions > ul > li:first-child').attr('style', '');
        } else {
            $('.actions > ul > li:first-child').attr('style', 'display:none');
        }

        // Allways allow previous action even if the current form is not valid!
        if (currentIndex > newIndex)
        {
            return true;
        }
        // Forbid next action on "Warning" step if the user is to young
        if (newIndex === 3 && Number($("#age-2").val()) < 18)
        {
            return false;
        }
        // Needed in some cases if the user went back (clean up)
        if (currentIndex < newIndex)
        {
            // To remove error styles
            form.find(".body:eq(" + newIndex + ") label.error").remove();
            form.find(".body:eq(" + newIndex + ") .error").removeClass("error");
        }
        form.validate().settings.ignore = ":disabled,:hidden";
        return form.valid();
    },
    onStepChanged: function (event, currentIndex, priorIndex)
    {
        // Used to skip the "Warning" step if the user is old enough.
        if (currentIndex === 2 && Number($("#age-2").val()) >= 18)
        {
            form.steps("next");
        }
        // Used to skip the "Warning" step if the user is old enough and wants to the previous step.
        if (currentIndex === 2 && priorIndex === 3)
        {
            form.steps("previous");
        }
    },
    onFinishing: function (event, currentIndex)
    {
        form.validate().settings.ignore = ":disabled";
        return form.valid();
    },
    onFinished: function (event, currentIndex)
    {
        form.submit();
    }
}).validate({
    errorPlacement: function errorPlacement(error, element) { element.before(error); },
    rules: {
        confirm: {
            equalTo: "#password-2"
        }
    }
});
    
});

