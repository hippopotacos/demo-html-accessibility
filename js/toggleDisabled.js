$(function(){
    $('.js-toggle-disabled').on('change', function(){
        if($(this).prop("checked") === true){
            $('.js-disabled-target').prop('disabled', true);
          }else{
            $('.js-disabled-target').prop('disabled', false);
          }
    });
});