$(function () {
    "use strict";
    $('.select-styled-new').selectpicker();


    $('#adver-form-validation').bootstrapValidator({
        //        live: 'disabled',
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            firstName: {
                validators: {
                    notEmpty: {
                        message: 'Обязательное поле для заполнения'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'Обязательное поле для заполнения'
                    }
                }
            },
            phone: {
                validators: {
                    notEmpty: {
                        message: 'Обязательное поле для заполнения'
                    }
                }
            },
            message: {
                validators: {
                    notEmpty: {
                        message: 'Обязательное поле для заполнения'
                    }
                }
            },
        }
    });

    // Validate the form manually
    $('#adver-form-validation-btn').click(function () {
        $('#adver-form-validation').bootstrapValidator('validate');
    });
});
