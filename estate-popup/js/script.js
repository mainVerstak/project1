$(function () {
    "use strict";
    $('.js-remove-card').on('click', function () {
        var $item = $(this).parents('.radio-card');
        var $container = $item.parent();
        var isChecked = $item.find('input:radio').is(':checked')

        if ($container.find('.radio-card').length > 1) {
            $item.remove();
            if (isChecked) {
                $container.find('.radio-card').first().find('input:radio').prop('checked', true);
            }
        }
    });
});
