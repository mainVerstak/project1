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

/*================================================================*/
//Формы
/*================================================================*/

document.addEventListener("DOMContentLoaded", function () {
    var phoneInputs = document.querySelectorAll('input[data-tel-input]');

    var getInputNumbersValue = function (input) {
        // Return stripped input value — just numbers
        return input.value.replace(/\D/g, '');
    }

    var onPhonePaste = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input);
        var pasted = e.clipboardData || window.clipboardData;
        if (pasted) {
            var pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
                // formatting will be in onPhoneInput handler
                input.value = inputNumbersValue;
                return;
            }
        }
    }

    var onPhoneInput = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            selectionStart = input.selectionStart,
            formattedInputValue = "";

        if (!inputNumbersValue) {
            return input.value = "";
        }

        if (input.value.length != selectionStart) {
            // Editing in the middle of input, not last symbol
            if (e.data && /\D/g.test(e.data)) {
                // Attempt to input non-numeric symbol
                input.value = inputNumbersValue;
            }
            return;
        }

        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
            var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
            formattedInputValue = input.value = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
        }
        input.value = formattedInputValue;
    }
    var onPhoneKeyDown = function (e) {
        // Clear input after remove last symbol
        var inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode == 8 && inputValue.length == 1) {
            e.target.value = "";
        }
    }
    for (var phoneInput of phoneInputs) {
        phoneInput.addEventListener('keydown', onPhoneKeyDown);
        phoneInput.addEventListener('input', onPhoneInput, false);
        phoneInput.addEventListener('paste', onPhonePaste, false);
    }
});


/*===================================*/


document.addEventListener("DOMContentLoaded", function () {
    const forms = document.querySelectorAll("._form");

    for (let i = 0; i < forms.length; i++) {
        let form = forms[i];

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            let error = formValidate(form);

            if (error === 0) {
                form.submit();
            }
        });

        let formFeqInputs = form.querySelectorAll("._req");

        for (let i = 0; i < formFeqInputs.length; i++) {
            let formFeqInput = formFeqInputs[i];

            formFeqInput.parentElement.addEventListener( 'click', (e) => {
                for (let i = 0; i < formFeqInputs.length; i++) {
                    let formFeqInput = formFeqInputs[i];
                    if (formFeqInput.classList.contains('_error')) {
                        formRemoveError(formFeqInput);
                    }
                }
            })
        }

        function formValidate(form) {
            let error = 0;
            let formFeq = form.querySelectorAll("._req");

            for (var i = 0; i < formFeq.length; i++) {
                let input = formFeq[i];
                formRemoveError(input);

                if (input.classList.contains('_email')) {
                    if (emailTest(input)) {
                        formAddError(input);
                        error++;
                    }
                } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                    formAddError(input);
                    error++;
                } else if (input.getAttribute("type") === "tel" && input.value != '') {
                    if (!nomerTest(input.value)) {
                        formAddError(input);
                        error++
                    }
                } else if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }

            return error;
        }

        function formAddError(input) {
            input.parentElement.classList.add("_error");
            input.classList.add("_error");
        }
        function formRemoveError(input) {
            input.parentElement.classList.remove("_error");
            input.classList.remove("_error");
        }
        function emailTest(input) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
        }
        function nomerTest(nomer) {
            if (true) {
                if (nomer[0] === "8" && nomer.length == 17) {
                    return true;
                } else if (nomer[0] === "+" && nomerTestSimvol(nomer) === "7" && nomer.length > 17) {
                    return true;
                }
            }
        }
        function nomerTestSimvol(nomer) {
            for (let i = 1; i < nomer.length; i++) {
                let simvol = nomer[i];

                if (+simvol > 0) {
                    return simvol;
                }
            }
        }
    }
});

/*================================================================*/
//Формы
/*================================================================*/